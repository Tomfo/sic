import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
    
  
  } else if (req.method === 'POST') {
    // const { email, name } = req.body;
    // try {
    //   const user = await prisma.user.create({
    //     data: { email, name }
    //   });
    //   res.status(201).json(user);
    // } catch (e) {
    //   res.status(400).json({ error: 'User creation failed', details: e.message });
    // }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}