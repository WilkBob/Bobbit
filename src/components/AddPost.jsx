import React, { useState, useContext, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../Firebase/Posts';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SignInIcon from '@mui/icons-material/Login';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const AddPost = ({ forumId }) => {
  const [loading, setLoading] = useState(false);
  const { user, userDetails } = useContext(UserContext);
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const validatePost = () => {
    if (title.trim().length < 5) {
      alert('Title must be at least 5 characters');
      return false;
    }
    if (content.trim().length < 10) {
      alert('Content must be at least 10 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(async (event) => {
  event.preventDefault();

  if (!user) return navigate('/login');
  if (!validatePost()) return;

  setLoading(true);

  const newPost = await addPost({
    title,
    content,
    userId: user.uid,
    username: userDetails.username ? userDetails.username : '',
    userImage: userDetails.profileImage || null,
    forumId: forumId,
    image: image,
    link,
  });

  // Clear the form
  setTitle('');
  setContent('');
  setImage(null);
  setImagePreviewUrl(null);
  setLink('');

  setLoading(false);
  navigate(`/post/${newPost.id}`);

}, [user, validatePost, title, content, userDetails, forumId, image, link]); // Add all dependencies here

  return (
    <>
      {!user && (
        <IconButton
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            navigate('/login');
          }}
          sx={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}
        >
          <SignInIcon />
        </IconButton>
      )}
      {user && (
        <IconButton
          color="primary"
          size="large"
          sx={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
          }}
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <AddIcon />}
        </IconButton>
      )}

      {user && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(!open)}
          fullWidth
          sx={{ marginBottom: '10px' }}
        >
          {open ? 'Close' : 'Add Post'}
        </Button>
      )}

      <Collapse
        in={open}
        className={'glass'}
        sx={{
          paddingBlock: open ? '10px' : '0px',
          marginBlock: open ? '10px' : '0px',
          marginBottom: '10px',
          transition: 'all 0.5s',
        }}
      >
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
                <IconButton color="primary" component="label">
                  <PhotoCamera />
                  <input type="file" accept="image/png" hidden onChange={handleImageChange} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {imagePreviewUrl && (
          <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
            <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />
            <IconButton
              className="glass"
              color="info"
              style={{ position: 'absolute', right: 0, top: 0 }}
              onClick={handleRemoveImage}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {loading ? <CircularProgress color="secondary" size={24} /> : 'Submit'}
        </Button>
      </Collapse>
    </>
  );
};

export default AddPost;
