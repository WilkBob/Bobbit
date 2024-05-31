import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import Email from '@mui/icons-material/Email';

const Contact = () => {
  return (
    <Container maxWidth="md" className='fadeIn'>
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you have any questions, please feel free to contact me, via <Link sx={{cursor:'pointer'}} href='mailto:bobbit.web@gmail.com'>email</Link>, or with the links below.
            </Typography>
          
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
          <a href='mailto:bobbit.web@gmail.com' target='_blank' rel='noopener noreferrer'>
              <IconButton sx={{color: 'white', cursor:'pointer'}}>
                  <Email/>
              </IconButton>
          </a>
          <a href='https://www.linkedin.com/in/robert-wilkinson-956204304/' target='_blank' rel='noopener noreferrer'>
            <IconButton sx={{color: 'white'}}>
                <LinkedIn sx={{color: 'white' ,cursor:'pointer'}}/>
            </IconButton>
          </a>
          <a href='https://www.github.com/wilkbob' target='_blank' rel='noopener noreferrer'>
              <IconButton sx={{color: 'white', cursor:'pointer'}}>
                  <GitHub/>
              </IconButton>
          </a>

        </div>
          
        </Paper>
      </Box>
    </Container>
  );
};

export default Contact;