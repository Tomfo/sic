'use client';

import { memberSchema, memberDefaultValues } from '@/lib/formValidationSchemas';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
} from '@mui/material';

const MAX_DEPENDANTS = 4;
const MAX_PARENTS = 2;

// --- Extracted Form Field Component ---
function FormField({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  ...rest
}) {
  return (
    <TextField
      {...register(name)}
      id={name}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      error={!!error}
      helperText={error?.message}
      fullWidth
      size='small'
      variant='outlined'
      margin='normal'
      {...rest}
    />
  );
}

// --- Extracted Select Field Component ---
function FormSelectField({ label, name, register, error, options, ...rest }) {
  return (
    <TextField
      {...register(name)}
      id={name}
      name={name}
      label={label}
      select
      error={!!error}
      helperText={error?.message}
      fullWidth
      size='small'
      variant='outlined'
      margin='normal'
      {...rest}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default function MemberForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: memberDefaultValues,
    resolver: yupResolver(memberSchema),
  });

  const {
    fields: childFields,
    append: appendChild,
    remove: removeChild,
  } = useFieldArray({
    control,
    name: 'children',
  });

  const {
    fields: parentFields,
    append: appendParent,
    remove: removeParent,
  } = useFieldArray({
    control,
    name: 'parents',
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3001/members', data);
      alert('Member created successfully!');
    } catch (error) {
      alert('Failed to submit member. Please try again.');
    }
  };

  return (
    <Box
      component='form'
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
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Identification Details */}
      <SectionTitle>Identification Details</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField
            label='National Id'
            name='nationalId'
            register={register}
            error={errors.nationalId}
            placeholder='National Id'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelectField
            defaultValues='select type'
            label='Type of Id'
            name='idType'
            register={register}
            error={errors.idType}
            options={[
              { value: 'GhCard', label: 'Ghana Card' },
              { value: 'Passport', label: 'Passport' },
            ]}
          />
        </Grid>
      </Grid>

      {/* Personal Details */}
      <SectionTitle>Personal Details</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormField
            label='First Name'
            name='firstName'
            register={register}
            error={errors.firstName}
            placeholder='First Name'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField
            label='Middle Name'
            name='middleName'
            register={register}
            error={errors.middleName}
            placeholder='Middle Name'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField
            label='Last Name'
            name='lastName'
            register={register}
            error={errors.lastName}
            placeholder='Last Name'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField
            label='Birthday'
            name='birthday'
            register={register}
            error={errors.birthday}
            type='date'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormSelectField
            label='Gender'
            name='gender'
            register={register}
            error={errors.gender}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
          />
        </Grid>
      </Grid>

      {/* Contact Details */}
      <SectionTitle>Contact Details</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormField
            label='Email'
            name='email'
            register={register}
            error={errors.email}
            placeholder='Email'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField
            label='Telephone'
            name='telephone'
            register={register}
            error={errors.telephone}
            placeholder='Telephone'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormField
            label='Address'
            name='residence'
            register={register}
            error={errors.residence}
            placeholder='Address'
          />
        </Grid>
      </Grid>

      {/* Spouse Details */}
      <SectionTitle>Spouse Details</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormField
            label='Spouse Full Name'
            name='spouseFullname'
            register={register}
            error={errors.spouseFullname}
            placeholder='Spouse Full Name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormField
            label='Spouse Birthday'
            name='spousebirthday'
            register={register}
            error={errors.spousebirthday}
            type='date'
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/* Children Details */}
      <SectionTitle>Children Details</SectionTitle>
      {childFields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={12} sm={5}>
            <FormField
              label={`Child ${index + 1} Full Name`}
              name={`children.${index}.fullName`}
              register={register}
              error={errors.children?.[index]?.fullName}
              placeholder='Full Name'
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormField
              label={`Child ${index + 1} Birthday`}
              name={`children.${index}.birthday`}
              register={register}
              error={errors.children?.[index]?.birthday}
              type='date'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={2} display='flex' alignItems='center'>
            <Button
              color='error'
              variant='contained'
              onClick={() => removeChild(index)}
              disabled={childFields.length <= 1}
              startIcon={<FontAwesomeIcon icon={faChild} />}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button
        sx={{ mt: 2 }}
        variant='outlined'
        color='success'
        startIcon={<FontAwesomeIcon icon={faChild} />}
        disabled={childFields.length >= MAX_DEPENDANTS}
        onClick={() => appendChild({ fullName: '', birthday: '' })}
      >
        Add Another Child
      </Button>

      {/* Parent Details */}
      <SectionTitle>Parent Details</SectionTitle>
      {parentFields.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={12} sm={4}>
            <FormField
              label={`Parent ${index + 1} Full Name`}
              name={`parents.${index}.fullName`}
              register={register}
              error={errors.parents?.[index]?.fullName}
              placeholder='Full Name'
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormField
              label='Birthday'
              name={`parents.${index}.birthday`}
              register={register}
              error={errors.parents?.[index]?.birthday}
              type='date'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormSelectField
              label='Relation'
              name={`parents.${index}.relationship`}
              register={register}
              error={errors.parents?.[index]?.relationship}
              options={[
                { value: 'Father', label: 'Father' },
                { value: 'Mother', label: 'Mother' },
                { value: 'Inlaw', label: 'In-law' },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={2} display='flex' alignItems='center'>
            <Button
              color='error'
              variant='contained'
              onClick={() => removeParent(index)}
              disabled={parentFields.length <= 1}
              startIcon={<FontAwesomeIcon icon={faUserPlus} />}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button
        sx={{ mt: 2 }}
        variant='outlined'
        color='primary'
        startIcon={<FontAwesomeIcon icon={faUserPlus} />}
        disabled={parentFields.length >= MAX_PARENTS}
        onClick={() =>
          appendParent({ fullName: '', birthday: '', relationship: '' })
        }
      >
        Add Another Parent
      </Button>

      {/* Undertaking */}
      <SectionTitle>Undertaking</SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('underlying')}
                sx={{ color: '#ff5722', '&.Mui-checked': { color: '#ff5722' } }}
              />
            }
            label={
              <Typography variant='subtitle2' sx={{ fontStyle: 'italic' }}>
                Do you or your relatives listed have any ongoing illness or
                condition?
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            {...register('condition')}
            id='condition'
            name='condition'
            label='Known Health Conditions'
            rows={2}
            multiline
            error={!!errors.condition}
            helperText={errors.condition?.message}
            fullWidth
            size='small'
            variant='outlined'
            margin='normal'
            placeholder='List any conditions'
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('declaration')}
                sx={{ color: '#ff5722', '&.Mui-checked': { color: '#ff5722' } }}
              />
            }
            label={
              <Typography variant='subtitle2' sx={{ fontStyle: 'italic' }}>
                I declare that the information provided is true, accurate and
                complete to the best of my belief and knowledge
              </Typography>
            }
          />
        </Grid>
      </Grid>

      {/* Submit/Cancel */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant='outlined' color='error' onClick={() => reset()}>
          Cancel
        </Button>
        <Button type='submit' variant='contained' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </Button>
      </Box>
    </Box>
  );
}

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
