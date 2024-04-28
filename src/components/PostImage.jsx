import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/system';
import { IconButton, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
});

const PostImage = ({ src }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Image
        alt="Comment"
        src={src}
        sx={{ 
          width: isMobile ? '100%' : '50%',  
          cursor: 'pointer', 
          transition: 'transform 0.15s ease-in-out, margin-bottom 0.15s ease-in-out',
          borderRadius: '4px',
          '&:hover': {
            transform: 'scale(1.1)',
            marginBottom: '15px'
          }
        }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            bgcolor: 'background.paper', 
            boxShadow: 24, 
            p: 4,
            width: isMobile ? '90%' : '80%',
            height: 'auto',
            borderRadius: '8px',
          }}
        >
        <IconButton
            sx={{ position: 'absolute', top: 0, right: 0 }}
            onClick={handleClose}
        >
            <Close/>
        </IconButton>
          <Image src={src} alt="Comment" />
        </Box>
      </Modal>
    </>
  );
}

export default PostImage;