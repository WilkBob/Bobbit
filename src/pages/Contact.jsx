import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const Contact = () => {
  return (
    <Container maxWidth="md" className='fadeIn'>
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you have any questions, please feel free to contact us at:
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: bobbit.web@gmail.com
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact;