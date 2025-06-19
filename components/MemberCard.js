'user client';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Button,
  Checkbox,
  FavoriteBorder,
  Favorite,
  Share,
} from '@mui/material';
import { useState } from 'react';

function ActionsCell({ member }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      // Perform your delete operation here
      console.log('Deleting:', itemToDelete);
      await axios.delete(`http://localhost:3001/members/${itemToDelete.id}`);
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
          <PreviewRoundedIcon fontSize='small' />
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
          <EditIcon fontSize='small' />
        </IconButton>
      </Link>

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
        <DeleteIcon fontSize='small' />
      </IconButton>
      {showModal && (
        <DeleteModal
          itemName={itemToDelete?.name || 'item'}
          onDelete={handleDeleteConfirm}
          onCancel={() => setShowModal(false)}
          isLoading={isDeleting}
        />
      )}
    </Box>
  );
}

export default function MemberCard() {
  return (
    <Card
      key={row.id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        maxWidth: 250,
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={'/defaultPhoto.png'}
          sx={{ width: 80, height: 80, borderRadius: '50%' }}
          variant='circular'
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant='h6'
            component='div'
            color={row.declaration ? 'success' : 'error'}
          >
            {row.firstName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {row.lastName}
          </Typography>
        </CardContent>
        <CardActions sx={{ pt: 0 }}>
          {/* <Chip
          sx={{ padding: 1 }}
          icon={
            row.declaration ? (
              <CheckCircleIcon fontSize='small' />
            ) : (
              <CancelIcon fontSize='small' />
            )
          }
          label={row.declaration ? 'Complete' : 'In Complete'}
          color={row.declaration ? 'success' : 'error'}
          variant='outlined'
        /> */}
          {row.email === primaryEmail && (
            <ActionsCell
              member={{
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                declaration: row.declaration,
              }}
            />
          )}
        </CardActions>
      </Box>
    </Card>
  );
}
