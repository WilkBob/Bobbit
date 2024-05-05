import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { addForum } from '../Firebase/Forums';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import  PhotoCamera  from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PostImage from './PostImage';

const AddForum = () => {
  const { user, userDetails } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate();

  const validateForum = () => {
    if (image && image.size > 2000000) {
      alert('Image must be less than 1MB');
      return false;
    }
    if (
      image &&
      !['image/jpeg', 'image/png', 'image/gif'].includes(image.type)
    ) {
      alert('Image must be a jpeg, png or gif');
      return false;
    }
    if (name.trim().length < 5) {
      alert('Name must be at least 5 characters');
      return false;
    }
    if (description.trim().length < 10) {
      alert('Description must be at least 10 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) navigate('/login');
    if (!validateForum()) return;

    const newid = await addForum(
      name,
      description,
      userDetails.uid,
      userDetails.username,
      image
    );
    setOpen(false);
    navigate(`/forum/${newid}`);
  };

  return (
    <div>
      {user && (
        <IconButton
          sx={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: 1000,
          }}
          onClick={() => {
            setOpen(!open);
            if (open) {
              setName('');
              setDescription('');
              setImage(null);
              setImagePreviewUrl(null);
            }
          }}
        >
          {open ? <CloseIcon /> : <AddIcon />}
        </IconButton>
      )}
      <Collapse in={open}>
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h5">Add a new forum</Typography>
          <Typography variant="caption">
            Please fill in the details below
          </Typography>
          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <IconButton sx={{ maxWidth: 'fit-content' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-button"
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <label htmlFor="upload-button">
              <PhotoCamera />
            </label>
          </IconButton>
          {imagePreviewUrl && <PostImage src={imagePreviewUrl} />}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Collapse>
    </div>
  );
};

export default AddForum;