import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { updateUser } from '../Firebase/firebaseDB';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const EditUser = ({handleClose}) => {
const {user} = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updates={
        username,
        bio
    }
    updateUser
  };

  return (
    <Container maxWidth="sm" sx={{marginTop:'400px'}}>
      <Box component="form" onSubmit={handleSubmit} className='glass' sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        p: 4,
      }}>
        <IconButton style={{alignSelf: 'flex-end'}} onClick={() => handleClose}>
          <Close />
        </IconButton>
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={handleBioChange}
          multiline
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
        {image && <Typography>{image.name}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default EditUser;