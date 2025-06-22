'use client';

import { useState } from 'react';
import { API_URL } from '@/lib/constants';
import {
  Modal,
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Fade,
  Backdrop,
} from '@mui/material';
import axios from 'axios';

/**
 * @param {object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {function} props.onClose - Close handler for the modal
 * @param {object} props.member - Member data (must have at least id, firstName, lastName)
 * @param {function} [props.onDeleteSuccess] - Optional callback after successful deletion
 */
export default function MemberDeleteModal({
  open,
  onClose,
  member,
  onDeleteSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    setError('');
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/members/${member.id}`);
      setDeleted(true);
      if (onDeleteSuccess) onDeleteSuccess(member.id);
      setTimeout(() => {
        setDeleted(false);
        onClose();
      }, 1500);
    } catch (e) {
      setError('Failed to delete member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby='delete-member-modal-title'
      aria-describedby='delete-member-modal-description'
    >
      <Fade in={open}>
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            width: '95%',
            maxWidth: 420,
            mx: 'auto',
            my: '20vh',
            outline: 'none',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h6'
            color='error'
            fontWeight='bold'
            id='delete-member-modal-title'
            gutterBottom
          >
            Delete Member
          </Typography>
          <Typography
            variant='body1'
            sx={{ mb: 2 }}
            id='delete-member-modal-description'
          >
            Are you sure you want to delete member{' '}
            <strong>
              {member.firstName} {member.lastName}
            </strong>
            ?
            <br />
            This action cannot be undone.
          </Typography>
          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {deleted ? (
            <Alert severity='success' sx={{ mb: 2 }}>
              Member{' '}
              <strong>
                {member.firstName} {member.lastName}
              </strong>{' '}
              has been deleted.
            </Alert>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant='contained'
                color='error'
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Delete'
                )}
              </Button>
              <Button
                variant='outlined'
                color='primary'
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
