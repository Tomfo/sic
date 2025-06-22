'use client';

import { useState, useEffect, useCallback, use } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/constants';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { useUser } from '@clerk/nextjs';
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
  Button,
  Chip,
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
import DeleteModal from './DeleteModal';
// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: '#00ACAC',
    color: theme.palette.common.white,
    fontWeight: 700,
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
function ResponsiveInfoCell({ row }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
      }}
    >
      <Image
        src={row.img || '/defaultPhoto.png'}
        alt={`${row.firstName} ${row.lastName}`}
        width={40}
        height={40}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          width: 40,
          height: 40,
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: { md: 1 } }}>
        <span style={{ fontWeight: 600 }}>{row.firstName}</span>
        <span className='text-xs text-gray-500'>{row.middleName}</span>
        <span className='text-xs text-gray-500'>{row.lastName}</span>
      </Box>
    </Box>
  );
}

ResponsiveInfoCell.propTypes = {
  row: PropTypes.object.isRequired,
};

function ActionsCell({ member }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { memberEmail } = member;
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // Perform your delete operation here
      console.log('Deleting:', itemToDelete);
      await axios.delete(`${API_URL}/members/${itemToDelete.id}`);
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
          <PreviewRoundedIcon />
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
          <EditIcon />
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
          <DeleteIcon />
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

// ActionsCell.propTypes = {
//   memberId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//     .isRequired,
// };

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

export default function MembersData({ rows }) {
  const { user } = useUser();
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [open, setOpen] = useState(false);
  // Ensure rows is always an array
  const safeRows = Array.isArray(members) ? members : [];

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

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce for 500ms

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Callback to fetch Members when the debounced search term changes
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/members`, {
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
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm]); // Only re-create if debouncedSearchTerm changes

  useEffect(() => {
    fetchMembers(); // Initial fetch and subsequent fetches on debounced term change
  }, [fetchMembers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
        {/* TOP */}
        <div className='flex items-center justify-between'>
          <div className='flex-1 flex justify-items-start'>
            <div className='hidden md:flex items-center gap-2 bg-gray-50 rounded-full ring-1 ring-gray-300 px-3 py-1 w-[260px] mb-2'>
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
          <div className='flex-1 flex justify-items-start'>
            <h1 className=' text-[#091b1b] font-bold text-2xl'>
              LIST OF REGISTERED MEMBERS
            </h1>
          </div>
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
            Loading orders...
          </Typography>
        </Box>
      ) : error ? (
        <Alert severity='error'>{error}</Alert>
      ) : orders.length === 0 ? (
        <Alert severity='info'>{`No orders found matching ${searchTerm}.`}</Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ width: '100%', overflowX: 'auto' }}
        >
          <Table aria-label='members table' sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Info</StyledTableCell>
                <StyledTableCell>Identification</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Birthday</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Telephone</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
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
                    <ResponsiveInfoCell row={row} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <strong>{row.idType}</strong>
                    <br />
                    {row.nationalId}
                  </StyledTableCell>
                  <StyledTableCell>{row.gender}</StyledTableCell>
                  <StyledTableCell>
                    {row.birthday ? row.birthday.split('T')[0] : ''}
                  </StyledTableCell>
                  <StyledTableCell sx={{ wordBreak: 'break-all' }}>
                    {row.email}
                  </StyledTableCell>
                  <StyledTableCell sx={{ wordBreak: 'break-all' }}>
                    {row.telephone}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Chip
                      icon={
                        row.declaration ? <CheckCircleIcon /> : <CancelIcon />
                      }
                      label={row.declaration ? 'Complete' : 'Active'}
                      color={row.declaration ? 'success' : 'error'}
                      variant='outlined'
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <p>{row.email}</p>
                    {row.email === user.emailAddresses ? (
                      <ActionsCell
                        member={{
                          id: row.id,
                          firstName: row.firstName,
                          lastName: row.lastName,
                        }}
                      />
                    ) : (
                      <p>not allowed</p>
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
                        fontSize: '0.9rem',
                      },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

// MembersData.propTypes = {
//   rows: PropTypes.array.isRequired,
//};
