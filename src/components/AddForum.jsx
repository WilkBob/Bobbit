import React, { useContext, useState } from 'react';
import { TextField, Button, Collapse } from '@mui/material';
import { addForum } from '../Firebase/Forums';
import { UserContext } from './context/UserContext';

const AddForum = () => {
const {user, userDetails} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addForum(name, description, userDetails.uid, userDetails.username, image);
    setOpen(false);
  };

  return (
    <div>
      {user && <Button onClick={() => setOpen(!open)} variant="contained">
        {open ? 'Close' : 'Add Forum'}
      </Button>}
      <Collapse in={open}>
        <form onSubmit={handleSubmit}>
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
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Collapse>
    </div>
  );
};

export default AddForum;