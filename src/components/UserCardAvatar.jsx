import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import  IconButton  from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import  styled  from '@mui/system/styled';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '100vh', // Limit the height of the image to the viewport height
  objectFit: 'contain', // Ensure that the image is scaled correctly
});

const UserCardAvatar = ({ src }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (src) setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  return (
    <>
      <Avatar
        src={src}
        sx={{ width: 200, height: 200, cursor: 'pointer', marginInline: 'auto' }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className='glass'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Close />
          </IconButton>
          <Image src={src} alt="Comment" sx={{ borderRadius: '4px' }} />
        </Box>
      </Modal>
    </>
  );
}

export default UserCardAvatar;
