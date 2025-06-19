import {
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  Avatar,
} from '@mui/material';

function RoundedImageCard({ imageUrl, title, description, actions }) {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 3,
        maxWidth: 500,
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Avatar
          src={imageUrl}
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
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ pt: 0 }}>
          {actions ? (
            actions
          ) : (
            <>
              <Button size='small' color='primary'>
                Action 1
              </Button>
              <Button size='small' color='secondary'>
                Action 2
              </Button>
            </>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}

export default RoundedImageCard;
