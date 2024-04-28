import React, { useState, useContext } from 'react';
import { Button, TextField, Collapse, IconButton, CircularProgress, InputAdornment } from '@mui/material';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../Firebase/Posts';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SignInIcon from '@mui/icons-material/Login';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const AddPost = ({forumId}) => {
  const [loading, setLoading] = useState(false);
    const {user, userDetails} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [link, setLink] = useState('');
    const navigate = useNavigate();


  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImagePreviewUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreviewUrl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

const validatePost = () => {
    if (title.length < 5) {
        alert('Title must be at least 5 characters');
        return false;
    }
    if (content.length < 10) {
        alert('Content must be at least 10 characters');
        return false;
    }


    return true;
}
const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) return navigate('/login');
    if (!validatePost())  return;

setLoading(true);

    console.log('Adding post', title, content, image, forumId, link, );
    await addPost({
        title,
        content,
        userId: user.uid,
        username: userDetails.username,
        userImage: userDetails.profileImage || null,
        forumId: forumId,
        image: image,
        link
    });

    // Clear the form
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreviewUrl(null);

    setLoading(false);
    setOpen(false);
    //relaod the page
}
  return (
    <>
      {!user && (
        <IconButton
        size='large'
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('/login');
          }}
          sx={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000}}
        >
          <SignInIcon />
        </IconButton>
      )}
      {!open && user && (
        <IconButton
        size='large'
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          sx={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000}}
        >
          <AddIcon />
        </IconButton>
      )}

{!open && user && (
  <Button
    variant="outlined"
    color="primary"
    onClick={handleOpen}
    fullWidth
    sx={{ marginBottom: '10px' }}
  >
    Add Post
  </Button>
)}
      <Collapse
        in={open}
        className={'glass'}
        sx={{
          display: open ? 'block' : 'none',

          marginBottom: '10px',
        }}
      >
        <IconButton
          color="primary"
          style={{ position: 'absolute', right: 0, top: 0 }}
          onClick={handleClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="title"
          autoFocus
          value={title}
          onChange={handleTitleChange}
        />
        <TextField
  variant="outlined"
  margin="normal"
  required
  fullWidth
  id="content"
  label="Content"
  name="content"
  multiline
  rows={4}
  value={content}
  onChange={handleContentChange}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          component="label"
        >
          <PhotoCamera />
          <input
            type="file"
            accept='image/png'
            hidden
            onChange={handleImageChange}
          />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
        {imagePreviewUrl &&
          <div
            style={{ position: 'relative', width: '100%', height: 'auto' }}
          >
            <img
              src={imagePreviewUrl}
              alt="Preview"
              style={{ width: '100%', height: 'auto' }}
            />
            <IconButton
              className="glass"
              color="info"
              style={{ position: 'absolute', right: 0, top: 0 }}
              onClick={handleRemoveImage}
            >
              <CloseIcon />
            </IconButton>
          </div>
         }
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {loading ? <CircularProgress color='secondary' size={24} /> : 'Submit'}
        </Button>
      </Collapse>
    </>
  );
};

export default AddPost;
