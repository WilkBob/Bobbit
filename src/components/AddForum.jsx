import React, { useContext, useState } from 'react';
import { TextField, Button, Collapse, IconButton } from '@mui/material';
import { addForum } from '../Firebase/Forums';
import { UserContext } from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Collections} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AddForum = () => {
const {user, userDetails} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!user) navigate('/login')
    await addForum(name, description, userDetails.uid, userDetails.username, image);
    setOpen(false);
  };

  return (
    <div>
      {user && 
    <IconButton
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
}
      <Collapse in={open}>
        <form onSubmit={handleSubmit}
        style={{
          padding: '10px',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
        >
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
          <IconButton sx={{maxWidth: 'fit-content'}}>
            
          <input
            accept='image/*'
            style={{ display: 'none' }}
            id='upload-button'
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label htmlFor='upload-button'>
            <Collections/>
          </label>
          </IconButton>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Collapse>
    </div>
  );
};

export default AddForum;