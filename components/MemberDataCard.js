// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// //import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useTheme, styled } from '@mui/material/styles';
// import { useUser } from '@clerk/nextjs';
// import { useMediaQuery } from '@mui/material';
// import { Chip, Alert, CircularProgress } from '@mui/material';

// import Image from 'next/image';
// import Link from 'next/link';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';

// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// import PreviewRoundedIcon from '@mui/icons-material/PreviewRounded';
// import DeleteModal from '@/components/DeleteModal';
// import { red } from '@mui/material/colors';
// import Box from '@mui/material/Box';
// import {
//   Card,
//   CardHeader,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Avatar,
//   Button,
//   Checkbox,
//   FavoriteBorder,
//   Favorite,
//   Share,
// } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';

// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     // Cleanup: Cancel the timeout if value changes (or component unmounts)
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// function ActionsCell({ member }) {
//   const [showModal, setShowModal] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   const handleDeleteClick = (item) => {
//     setItemToDelete(item);
//     setShowModal(true);
//   };

//   const handleDeleteConfirm = async () => {
//     setIsDeleting(true);
//     try {
//       // Perform your delete operation here
//       console.log('Deleting:', itemToDelete);
//       await axios.delete(`http://localhost:3001/members/${itemToDelete.id}`);
//       // Simulate API call
//     } catch (error) {
//       console.error('Delete failed:', error);
//     } finally {
//       setIsDeleting(false);
//       setShowModal(false);
//     }
//   };

//   // Optionally, pass the memberId to build URLs dynamically
//   return (
//     <Box sx={{ display: 'flex', gap: 1 }}>
//       <Link href={`/members/${member.id}`} passHref>
//         <IconButton
//           size='small'
//           // sx={{ bgcolor: '#CC6CE7', color: 'white' }}
//           sx={{
//             color: 'white',
//             bgcolor: '#CC6CE7', // Light gray from theme
//             '&:hover': {
//               bgcolor: 'green', // Light red from theme (if using custom palette)
//             },
//           }}
//           aria-label='View'
//         >
//           <PreviewRoundedIcon fontSize='small' />
//         </IconButton>
//       </Link>

//       <Link href={`/members/${member.id}/edit`} passHref>
//         <IconButton
//           size='small'
//           // sx={{ bgcolor: '#060270', color: 'white' }}
//           sx={{
//             color: 'white',
//             bgcolor: '#060270', // Light gray from theme
//             '&:hover': {
//               bgcolor: 'green', // Light red from theme (if using custom palette)
//             },
//           }}
//           aria-label='Edit'
//         >
//           <EditIcon fontSize='small' />
//         </IconButton>
//       </Link>

//       <IconButton
//         onClick={() =>
//           handleDeleteClick({
//             id: member.id,
//             name: member.firstName + ' ' + member.lastName,
//           })
//         }
//         size='small'
//         // sx={{ bgcolor: '#D20103', color: 'white' }}
//         sx={{
//           color: 'white',
//           bgcolor: '#D20103', // Light gray from theme
//           '&:hover': {
//             bgcolor: 'green', // Light red from theme (if using custom palette)
//           },
//         }}
//         aria-label='Delete'
//       >
//         <DeleteIcon fontSize='small' />
//       </IconButton>
//       {showModal && (
//         <DeleteModal
//           itemName={itemToDelete?.name || 'item'}
//           onDelete={handleDeleteConfirm}
//           onCancel={() => setShowModal(false)}
//           isLoading={isDeleting}
//         />
//       )}
//     </Box>
//   );
// }

// export default function MemberDataCard() {
//   const theme = useTheme();
//   const { user } = useUser();
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const primaryEmail = user?.primaryEmailAddress?.emailAddress;

//   const [members, setMembers] = useState([]);
//   const safeRows = Array.isArray(members) ? members : [];

//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce for 500ms

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   //const router = useRouter();

//   // Callback to fetch Members when the debounced search term changes
//   const fetchMembers = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:3001/members', {
//         params: {
//           search: debouncedSearchTerm, // Pass the debounced search term as a query parameter
//         },
//       });
//       setMembers(response.data);
//     } catch (err) {
//       setError(
//         `Failed to fetch Members: ${err.response?.data?.error || err.message}`
//       );
//       console.error('Fetch Members error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [debouncedSearchTerm]); // Only re-create if debouncedSearchTerm changes

//   useEffect(() => {
//     fetchMembers(); // Initial fetch and subsequent fetches on debounced term change
//   }, [fetchMembers]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       <div className='flex items-center justify-between'>
//         <div className='flex-1 flex justify-items-start'>
//           <div className='flex items-center gap-2 bg-gray-50 rounded-md ring-1 ring-gray-300 px-3 py-1 w-[260px] mb-2'>
//             <Image src='/search.png' alt='Search' width={16} height={16} />
//             <input
//               type='text'
//               value={searchTerm}
//               onChange={handleSearchChange}
//               placeholder='Search…'
//               className='w-full bg-transparent outline-none text-sm px-2 py-1'
//             />
//           </div>
//         </div>
//         <div className='flex-1 flex justify-items-start'>
//           <h1 className='hidden sm:text-[#2dc2c2] font-bold text-md'>
//             REGISTERED MEMBERS
//           </h1>
//         </div>
//       </div>
//       {loading ? (
//         <Box
//           display='flex'
//           justifyContent='center'
//           alignItems='center'
//           height='200px'
//         >
//           <CircularProgress />
//           <Typography variant='h6' style={{ marginLeft: '15px' }}>
//             Loading orders...
//           </Typography>
//         </Box>
//       ) : error ? (
//         <Alert severity='error'>{error}</Alert>
//       ) : members.length === 0 ? (
//         <Alert severity='info'>No orders found matching "{searchTerm}".</Alert>
//       ) : (
//         <Box
//           sx={{
//             width: '100%',
//             display: 'grid',
//             gridTemplateColumns:
//               'repeat(auto-fill, minmax(min(400px, 100%), 1fr))',
//             gap: 2,
//           }}
//         >
//           {safeRows.map((row) => (
//             <Card
//               key={row.id}
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 borderRadius: 3,
//                 maxWidth: 250,
//               }}
//             >
//               <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
//                 <Avatar
//                   src={'/defaultPhoto.png'}
//                   sx={{ width: 80, height: 80, borderRadius: '50%' }}
//                   variant='circular'
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   flex: 1,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                 }}
//               >
//                 <CardContent sx={{ flex: 1 }}>
//                   <Typography
//                     variant='h6'
//                     component='div'
//                     color={row.declaration ? 'success' : 'error'}
//                   >
//                     {row.firstName}
//                   </Typography>
//                   <Typography variant='body2' color='text.secondary'>
//                     {row.lastName}
//                   </Typography>
//                 </CardContent>
//                 <CardActions sx={{ pt: 0 }}>
//                   {/* <Chip
//                     sx={{ padding: 1 }}
//                     icon={
//                       row.declaration ? (
//                         <CheckCircleIcon fontSize='small' />
//                       ) : (
//                         <CancelIcon fontSize='small' />
//                       )
//                     }
//                     label={row.declaration ? 'Complete' : 'In Complete'}
//                     color={row.declaration ? 'success' : 'error'}
//                     variant='outlined'
//                   /> */}
//                   {row.email === primaryEmail && (
//                     <ActionsCell
//                       member={{
//                         id: row.id,
//                         firstName: row.firstName,
//                         lastName: row.lastName,
//                         declaration: row.declaration,
//                       }}
//                     />
//                   )}
//                 </CardActions>
//               </Box>
//             </Card>
//           ))}
//         </Box>
//       )}
//     </div>
//   );
// }
