'use client';

import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import {
  Typography,
  Grid,
  Box,
  Divider,
  Paper,
  Chip,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';

// --- Section Title Component ---
function SectionTitle({ children }) {
  return (
    <Typography
      variant='h6'
      sx={{
        color: '#00ACAC',
        fontWeight: 'bold',
        mt: 3,
        mb: 1,
        borderBottom: '1px solid #e0e0e0',
        pb: 1,
      }}
    >
      {children}
    </Typography>
  );
}

// --- Field Display Component ---
function FieldDisplay({ label, value }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant='subtitle2' color='text.secondary'>
        {label}
      </Typography>
      <Typography
        variant='body1'
        sx={{ fontWeight: 500, wordBreak: 'break-word' }}
      >
        {value || <span style={{ color: '#aaa' }}>—</span>}
      </Typography>
    </Grid>
  );
}

// --- Array Field Display ---
function ArrayFieldDisplay({
  label,
  items,
  renderItem,
  columns = { xs: 12, sm: 12, md: 12 },
}) {
  return (
    <>
      {items && items.length > 0 ? (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {items.map((item, idx) => (
            <Grid item key={idx} {...columns}>
              <Paper
                variant='outlined'
                sx={{ p: { xs: 1, sm: 2 }, bgcolor: '#fafbfc' }}
              >
                <Typography
                  variant='subtitle2'
                  color='text.secondary'
                  sx={{ mb: 1 }}
                >
                  {label} {items.length > 1 ? idx + 1 : ''}
                </Typography>
                {renderItem(item, idx)}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          No {label.toLowerCase()} listed.
        </Typography>
      )}
    </>
  );
}

// --- Main View Component ---
/**
 * @param {object} props
 * @param {object} props.data - Member data to display (should match the member form fields)
 */
export default function ViewMemberDetails({ data }) {
  // Destructure all fields for clarity
  const {
    id,
    nationalId,
    idType,
    firstName,
    middleName,
    lastName,
    birthday,
    gender,
    email,
    telephone,
    residence,
    spouseFullname,
    spousebirthday,
    children = [],
    parents = [],
    underlying,
    condition,
    declaration,
  } = data || {};

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        m: 2,
        p: { xs: 1, sm: 3 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      {/* Responsive Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          mx: { xs: 0, sm: 2 },
          mb: 2,
          gap: 1,
        }}
      >
        <Typography
          variant={isXs ? 'h6' : 'h4'}
          component='h1'
          sx={{
            color: '#091b1b',
            fontWeight: 'bold',
            textAlign: { xs: 'left', sm: 'center' },
            mb: { xs: 1, sm: 0 },
            flex: 1,
          }}
        >
          REGISTRATION INFORMATION
        </Typography>
        <Link href={`/members/${id}/edit`} passHref legacyBehavior>
          <Button
            startIcon={<EditIcon />}
            size={isXs ? 'small' : 'medium'}
            variant='contained'
            sx={{
              bgcolor: '#060270',
              color: 'white',
              '&:hover': {
                bgcolor: 'green',
              },
              minWidth: 0,
            }}
            aria-label='Edit'
          >
            {isXs ? null : 'Edit'}
          </Button>
        </Link>
      </Box>

      {/* Identification Details */}
      <SectionTitle>Identification Details</SectionTitle>
      <Grid container spacing={2}>
        <FieldDisplay label='National ID' value={nationalId} />
        <FieldDisplay label='Type of ID' value={idType} />
      </Grid>

      {/* Personal Details */}
      <SectionTitle>Personal Details</SectionTitle>
      <Grid container spacing={2}>
        <FieldDisplay label='First Name' value={firstName} />
        <FieldDisplay label='Middle Name' value={middleName} />
        <FieldDisplay label='Last Name' value={lastName} />
        <FieldDisplay label='Birthday' value={birthday?.split?.('T')[0]} />
        <FieldDisplay label='Gender' value={gender} />
      </Grid>

      {/* Contact Details */}
      <SectionTitle>Contact Details</SectionTitle>
      <Grid container spacing={2}>
        <FieldDisplay label='Email' value={email} />
        <FieldDisplay label='Telephone' value={telephone} />
        <FieldDisplay label='Address' value={residence} />
      </Grid>

      {/* Spouse Details */}
      <SectionTitle>Spouse Details</SectionTitle>
      <Grid container spacing={2}>
        <FieldDisplay label='Full Name' value={spouseFullname} />
        <FieldDisplay
          label='Birthday'
          value={spousebirthday?.split?.('T')[0]}
        />
      </Grid>

      {/* Children Details */}
      <SectionTitle>Children Details</SectionTitle>
      <ArrayFieldDisplay
        label='Child'
        items={children}
        columns={{ xs: 12, sm: 6, md: 6 }}
        renderItem={(child, idx) => (
          <Grid container spacing={1}>
            <FieldDisplay label='Full Name' value={child.fullName} />
            <FieldDisplay
              label='Birthday'
              value={child.birthday?.split?.('T')[0]}
            />
          </Grid>
        )}
      />

      {/* Parent Details */}
      <SectionTitle>Parent Details</SectionTitle>
      <ArrayFieldDisplay
        label='Parent'
        items={parents}
        columns={{ xs: 12, sm: 6, md: 6 }}
        renderItem={(parent, idx) => (
          <Grid container spacing={1}>
            <FieldDisplay label='Full Name' value={parent.fullName} />
            <FieldDisplay
              label='Birthday'
              value={parent.birthday?.split?.('T')[0]}
            />
            <FieldDisplay label='Relation' value={parent.relationship} />
          </Grid>
        )}
      />

      {/* Undertaking */}
      <SectionTitle>Undertaking</SectionTitle>
      <Box sx={{ mb: 2 }}>
        <Typography variant='subtitle2' sx={{ fontStyle: 'italic' }}>
          Ongoing illness/condition:{' '}
          <Chip
            label={underlying ? 'Yes' : 'No'}
            color={underlying ? 'warning' : 'default'}
            size='small'
            sx={{ ml: 1 }}
          />
        </Typography>
        {underlying && (
          <Typography variant='body2' sx={{ mt: 1 }}>
            Known Health Conditions:{' '}
            {condition || <span style={{ color: '#aaa' }}>None specified</span>}
          </Typography>
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='subtitle2' sx={{ fontStyle: 'italic' }}>
          Declaration Accepted:{' '}
          <Chip
            label={declaration ? 'Yes' : 'No'}
            color={declaration ? 'success' : 'default'}
            size='small'
            sx={{ ml: 1 }}
          />
        </Typography>
      </Box>
    </Box>
  );
}
