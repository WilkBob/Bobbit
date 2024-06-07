import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

const About = () => {
  return (
    <Container maxWidth="md" className='fadeIn'>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About This Project
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Class Project for Promineo Tech's Front-End Bootcamp
          </Typography>
          <Typography variant="body1" gutterBottom>
            This project was made to demonstrate the skills learned in Promineo Tech's Front-End Bootcamp. It is a simple forum application that allows users to create posts, comment on posts, and interact with each other.
          </Typography>
          
          <Typography variant="h6" component="h2" gutterBottom>
            Technologies Used:
          </Typography>
          <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' alt='HTML5' />
          </a>
      
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' alt='CSS3' />
          </a>
          
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' alt='JavaScript' />
          </a>
          
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white' alt='React' />
          </a>
          <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black' alt='Firebase' />
          </a>
          <a href="https://mui.com" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white' alt='Material UI' />
          </a>
          <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">
            <img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white' alt='React Router' />
          </a>

          <Typography variant="h6" component="h2" gutterBottom>
            Features:
          </Typography>
          <ul>
            <li>Users can register, and customize their profiles</li>
            <li>Users can create posts, and like/comment on them</li>
            <li> New comments, likes, and posts will propagate to all users instantly</li>
            <li>Users can  sort posts by a popularity algorithm, by likes, or chronologically</li>
          </ul>
          <Typography variant="h6" component="h2" gutterBottom>
            Test User:
          </Typography>
          <ul>
            <li>Username:
              <strong> test@test.test</strong>
            </li>
            <li>Password:
              <strong> testPass!</strong>
            </li>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
};

export default About;