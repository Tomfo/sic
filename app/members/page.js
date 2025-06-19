'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
//import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { useUser } from '@clerk/nextjs';
import { useMediaQuery } from '@mui/material';
import {
  Modal,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Fade,
  TextField,
  Backdrop,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Container,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
  Avatar,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Image from 'next/image';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
import DeleteModal from '@/components/DeleteModal';
// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: '#00ACAC',
    color: theme.palette.common.white,
    // fontWeight: 600,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
    wordBreak: 'break-word',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// Responsive cell component
function ResponsiveInfoCell({ member }) {
  const { user } = useUser();
  const isMobile = useMediaQuery('(max-width:640px)');
  const primaryEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={'/defaultPhoto.png'} sx={{ width: 32, height: 32, mr: 1 }} />
      <Box
        sx={{
          display: 'flex flex-col',
          gap: 1,
          flexDirection: 'row',
          ml: { md: 1 },
        }}
      >
        <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
          {member.lastName}
        </Typography>
        <span className='text-md text-gray-500 mr-1.5'>{member.firstName}</span>
        <span className='text-md text-gray-500 ml-2'>{member.middleName}</span>
        <div className='mt-0.5 md:hidden'>
          {member.email === primaryEmail && (
            <ActionsCell
              member={{
                id: member.id,
                firstName: member.firstName,
                lastName: member.lastName,
                declaration: member.declaration,
              }}
            />
          )}
        </div>
      </Box>
    </Box>
  );
}

function ActionsCell({ member, onDeleteRecord }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };
  // const UpdateData = () => {
  //   onDeleteRecord();
  // };
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // Perform your delete operation here
      console.log('Deleting:', itemToDelete);
      await axios.delete(`http://localhost:3001/members/${itemToDelete.id}`);
      onDeleteRecord();
      // Simulate API call
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  // Optionally, pass the memberId to build URLs dynamically
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Link href={`/members/${member.id}`} passHref>
        <IconButton
          size='small'
          // sx={{ bgcolor: '#CC6CE7', color: 'white' }}
          sx={{
            color: 'white',
            bgcolor: '#CC6CE7', // Light gray from theme
            '&:hover': {
              bgcolor: 'green', // Light red from theme (if using custom palette)
            },
          }}
          aria-label='View'
        >
          <PreviewRoundedIcon fontSize='smaall' />
        </IconButton>
      </Link>

      <Link href={`/members/${member.id}/edit`} passHref>
        <IconButton
          size='small'
          // sx={{ bgcolor: '#060270', color: 'white' }}
          sx={{
            color: 'white',
            bgcolor: '#060270', // Light gray from theme
            '&:hover': {
              bgcolor: 'green', // Light red from theme (if using custom palette)
            },
          }}
          aria-label='Edit'
        >
          <EditIcon fontSize='smaall' />
        </IconButton>
      </Link>
      <div>
        <IconButton
          onClick={() =>
            handleDeleteClick({
              id: member.id,
              name: member.firstName + ' ' + member.lastName,
            })
          }
          size='small'
          // sx={{ bgcolor: '#D20103', color: 'white' }}
          sx={{
            color: 'white',
            bgcolor: '#D20103', // Light gray from theme
            '&:hover': {
              bgcolor: 'green', // Light red from theme (if using custom palette)
            },
          }}
          aria-label='Delete'
        >
          <DeleteIcon fontSize='smaall' />
        </IconButton>
        {showModal && (
          <DeleteModal
            itemName={itemToDelete?.name || 'item'}
            onDelete={handleDeleteConfirm}
            onCancel={() => setShowModal(false)}
            isLoading={isDeleting}
          />
        )}
      </div>
    </Box>
  );
}

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Cancel the timeout if value changes (or component unmounts)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function RegisteredMembersData({ rows }) {
  const { user } = useUser();
  const isMobile = useMediaQuery('(max-width:640px)');
  const primaryEmail = user?.primaryEmailAddress?.emailAddress;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce for 500ms

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const router = useRouter();
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [open, setOpen] = useState(false);
  // Ensure rows is always an array
  // const safeRows = Array.isArray(members) ? members : [];
  // Filter rows in-memory
  const safeRows = useMemo(() => {
    return members.filter((member) => {
      const search = debouncedSearchTerm.toLowerCase();
      return (
        member.firstName.toLowerCase().includes(search) ||
        member.lastName.toLowerCase().includes(search) ||
        member.middleName.toLowerCase().includes(search) ||
        member.telephone.toString().includes(search)
      );
    });
  }, [debouncedSearchTerm, members]);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - safeRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Callback to fetch Members when the debounced search term changes
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/members', {
        params: {
          search: debouncedSearchTerm, // Pass the debounced search term as a query parameter
        },
      });
      setMembers(response.data);
    } catch (err) {
      setError(
        `Failed to fetch Members: ${err.response?.data?.error || err.message}`
      );
      console.error('Fetch Members error:', err);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }; // Only re-create if debouncedSearchTerm changes

  useEffect(() => {
    fetchMembers(); // Initial fetch and subsequent fetches on debounced term change
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='m-5 bg-white p-2'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <div className='flex-1 flex justify-items-start'>
          <div className='flex items-center gap-2 bg-gray-50 rounded-md ring-1 ring-gray-300 px-3 py-1 w-[260px] mb-2'>
            <Image src='/search.png' alt='Search' width={16} height={16} />
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search…'
              className='w-full bg-transparent outline-none text-sm px-2 py-1'
            />
          </div>
        </div>
        <div className='hidden md:flex'>
          <h1 className='text-[#0a0b0b] font-bold text-md'>
            REGISTERED MEMBERS
          </h1>
        </div>
      </div>

      {/* Loading / Error / Data Grid */}
      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='200px'
        >
          <CircularProgress />
          <Typography variant='h6' style={{ marginLeft: '15px' }}>
            Loading Register...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : members.length === 0 ? (
        <Alert severity='info'>No members found matching "{searchTerm}".</Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ width: '100%', overflowX: 'auto' }}
        >
          <Table aria-label='members table' sx={{ minWidth: 640 }}>
            <TableHead
              sx={{
                background: '#c4c7d4',
                color: 'white',
              }}
            >
              <TableRow>
                <StyledTableCell>Info</StyledTableCell>

                {/* {!isMobile && <StyledTableCell>Identification</StyledTableCell>} */}
                {!isMobile && <StyledTableCell>Gender</StyledTableCell>}
                {/* {!isMobile && <StyledTableCell>Birthday</StyledTableCell>} */}
                {!isMobile && <StyledTableCell>Email</StyledTableCell>}
                {!isMobile && <StyledTableCell>Telephone</StyledTableCell>}
                {!isMobile && <StyledTableCell>Status</StyledTableCell>}
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? safeRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : safeRows
              ).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>
                    <ResponsiveInfoCell
                      member={{
                        id: row.id,
                        middleName: row.middleName,
                        firstName: row.firstName,
                        lastName: row.lastName,
                        declaration: row.declaration,
                        email: row.email,
                      }}
                    />
                  </StyledTableCell>
                  {/* {!isMobile && (
                    <StyledTableCell>
                      <strong>{row.idType}</strong>
                      <br />
                      {row.nationalId}
                    </StyledTableCell>
                  )} */}
                  {!isMobile && <StyledTableCell>{row.gender}</StyledTableCell>}
                  {/* {!isMobile && (
                    <StyledTableCell>
                      {row.birthday ? row.birthday.split('T')[0] : ''}
                    </StyledTableCell>
                  )} */}
                  {!isMobile && (
                    <StyledTableCell sx={{ wordBreak: 'break-all' }}>
                      {row.email}
                    </StyledTableCell>
                  )}
                  {!isMobile && (
                    <StyledTableCell sx={{ wordBreak: 'break-all' }}>
                      {row.telephone}
                    </StyledTableCell>
                  )}
                  {!isMobile && (
                    <StyledTableCell>
                      <Chip
                        size='small'
                        icon={
                          row.declaration ? <CheckCircleIcon /> : <CancelIcon />
                        }
                        label={row.declaration ? 'Complete' : 'Pending'}
                        color={row.declaration ? 'success' : 'error'}
                        variant='outlined'
                      />
                    </StyledTableCell>
                  )}
                  <StyledTableCell>
                    {row.email === primaryEmail && (
                      <ActionsCell
                        member={{
                          id: row.id,
                          firstName: row.firstName,
                          lastName: row.lastName,
                        }}
                        onDeleteRecord={fetchMembers}
                      />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {/* Render empty rows for consistent height */}
              {emptyRows > 0 &&
                Array.from({ length: emptyRows }).map((_, idx) => (
                  <StyledTableRow key={`empty-row-${idx}`}>
                    <StyledTableCell colSpan={7} />
                  </StyledTableRow>
                ))}
            </TableBody>
            {!isMobile && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={7}
                    count={safeRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },

                        native: true,
                      },
                    }}
                    sx={{
                      '.MuiTablePagination-toolbar': {
                        flexWrap: 'wrap',
                      },
                      '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
                        {
                          fontSize: '0.8rem',
                        },
                    }}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
