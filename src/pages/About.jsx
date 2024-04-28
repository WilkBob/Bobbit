import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About This Project
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Class Project for Promineo Tech's Front-End Bootcamp
          </Typography>
          <Typography variant="body1" gutterBottom>
            This project is a culmination of the skills and knowledge acquired during the front-end bootcamp at Promineo Tech. It showcases the ability to build a full-fledged application using React, Firebase, and Material-UI.
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Functionality of the App
          </Typography>
          <Typography variant="body1" gutterBottom>
            The application is a simple forum where users can create posts, comment on posts, and interact with each other. It uses Firebase for real-time data updates and Material-UI for a clean, modern design.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Users can create new posts, edit their existing posts, and delete posts. They can also comment on posts, providing a platform for discussion and interaction.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The application also includes user authentication, allowing users to sign up, log in, and manage their accounts.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;