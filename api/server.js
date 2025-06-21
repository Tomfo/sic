// api/server.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { default: next } = require('next');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
const corsOptions = {
  origin: process.env.NEXT_PUBLIC_FRONTEND_API_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};
app.use(cors(corsOptions));

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Async wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// API endpoints

// Get all users
app.get(
  '/members',
  asyncHandler(async (req, res) => {
    const { search } = req.query;
    const whereClause = {};

    if (search) {
      // If a search term is provided, filter by customerName (case-insensitive for PostgreSQL)
      // whereClause.customerName = {
      //   contains: search,
      //   mode: 'insensitive', // Important for case-insensitive search in PostgreSQL
      // };
      // You could also add OR conditions to search in other fields, e.g.:
      whereClause.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { middleName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ];
    }

    try {
      const members = await prisma.person.findMany({
        where: whereClause,
        include: {
          children: {
            select: {
              fullName: true,
            },
          },
          parents: {
            select: {
              fullName: true,
            },
          },
        },
      });
      res.json(members);
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({ error: 'Failed to fetch persons' });
    }
  })
);

//Create Member
app.post(
  '/members',
  asyncHandler(async (req, res, next) => {
    const {
      nationalId,
      idType,
      firstName,
      middleName,
      lastName,
      gender,
      birthday,
      spouseFullname,
      spousebirthday,
      email,
      telephone,
      residence,
      underlying,
      condition,
      declaration,
      children,
      parents,
    } = req.body;

    try {
      const person = await prisma.person.create({
        data: {
          nationalId,
          idType,
          firstName,
          middleName,
          lastName,
          gender,
          birthday,
          spouseFullname,
          spousebirthday,
          email,
          telephone,
          residence,
          underlying,
          condition,
          declaration,
          children: {
            createMany: {
              data: children.map((child) => ({
                fullName: child.fullName,
                birthday: child.birthday,
              })),
            },
          },
          parents: {
            createMany: {
              data: parents.map((parent) => ({
                fullName: parent.fullName,
                birthday: parent.birthday,
                relationship: parent.relationship,
              })),
            },
          },
        },
        include: {
          parents: true,
          children: true,
        },
      });
      res.status(201).json(person);
    } catch (error) {
      if (error.code === 'P2002') {
        return next(
          new AppError(`Person with ID ${nationalId} already exists`, 400)
        );
      }
      next(error);
    }
  })
);

//Get Memnber by ID
app.get(
  '/members/:id',
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const person = await prisma.person.findUnique({
      // relationLoadStrategy: 'join', // or 'query'

      where: {
        id: id,
      },
      include: {
        children: {
          select: {
            id: true,
            fullName: true,
            birthday: true,
          },
        },
        parents: {
          select: {
            id: true,
            fullName: true,
            birthday: true,
            relationship: true,
          },
        },
      },
    });
    if (!person) {
      return next(new AppError('Memberr not found', 404));
    }
    res.json(person);
  })
);

// Full update of Member with their parents and children, deleting related data
app.put(
  '/members/:id',
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { children = [], parents = [], ...memberData } = req.body;

    try {
      const existingMember = await prisma.person.findUnique({
        where: { id: id },
        include: { children: true, parents: true },
      });

      if (!existingMember) {
        return next(new AppError('Person not found', 404));
      }
      // CHILDREN UPDATES, DELETES AND NEW DATA
      const existingChildIds = existingMember.children.map((child) => child.id);
      const newChildIds = children
        .filter((child) => child.id)
        .map((child) => child.id);

      const childrenToDelete = existingChildIds.filter(
        (id) => !newChildIds.includes(id)
      );
      const childrenToCreate = children
        .filter((child) => !child.id)
        .map((child) => ({
          fullName: child.fullName,
          birthday: child.birthday,
        }));

      const childrenToUpdate = children.filter((child) => child.id);

      //--------------------------------------------------------------------
      // PARENTS UPDATES, DELETES AND NEW DATA
      const existingParentIds = existingMember.parents.map(
        (parent) => parent.id
      );
      const newParentIds = parents
        .filter((parent) => parent.id)
        .map((parent) => parent.id);

      const parentsToDelete = existingParentIds.filter(
        (id) => !newParentIds.includes(id)
      );
      const parentsToCreate = parents
        .filter((parent) => !parent.id)
        .map((parent) => ({
          fullName: parent.fullName,
          birthday: parent.birthday,
          relationship: parent.relationship,
        }));

      const parentsToUpdate = parents.filter((parent) => parent.id);

      //---------------------------------------------------------------------------------

      const updatedMember = await prisma.person.update({
        where: { id: id },
        data: {
          ...memberData,
          children: {
            deleteMany: {
              id: { in: childrenToDelete },
            },
            createMany: {
              data: childrenToCreate,
            },
            updateMany: childrenToUpdate.map((child) => ({
              where: { id: child.id },
              data: { fullName: child.fullName, birthday: child.birthday },
            })),
          },
          parents: {
            deleteMany: {
              id: { in: parentsToDelete },
            },
            createMany: {
              data: parentsToCreate,
            },
            updateMany: parentsToUpdate.map((parent) => ({
              where: { id: parent.id },
              data: {
                fullName: parent.fullName,
                birthday: parent.birthday,
                relationship: parent.relationship,
              },
            })),
          },
        },
        include: { children: true, parents: true },
      });

      res.json(updatedMember);
    } catch (error) {
      next(error);
      // console.error(error);
      // res.status(500).json({ error: 'Failed to update person' });
    }
  })
);

//Delete Member
app.delete(
  '/members/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // console.log('delete id from server:', id);
    try {
      // Check if the order exists before attempting to delete
      const memberExists = await prisma.person.findUnique({
        where: { id: +id },
        select: { id: true }, // Just fetch a small field to confirm existence
      });

      if (!memberExists) {
        return next(new AppError('Person not found', 404));
      }

      // Delete the order. Due to onDelete: Cascade in schema,
      // all associated order items will also be deleted by PostgreSQL.
      await prisma.person.delete({
        where: { id: +id },
      });

      res.status(204).send(); // 204 No Content typically for successful DELETE with no response body
    } catch (error) {
      next(error);
      // console.error('Error deleting member:', error);
      // res
      //   .status(500)
      //   .json({ error: 'Failed to delete member', details: error.message });
    }
  })
);

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

//start server
console.log(process.env.NEXT_PUBLIC_FRONTEND_API_URL)
console.log(process.env.NEXT_PUBLIC_API_URL)
app.listen(port, () => {
  console.log(
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  );
  console.log(`Server is running on http://localhost:${port} at `);
});
