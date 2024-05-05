import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import  styled  from '@mui/system/styled';
import  useTheme  from '@mui/system/useTheme';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Close from '@mui/icons-material/Close';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  maxHeight: '100vh', // Limit the height of the image to the viewport height
  objectFit: 'contain', // Ensure that the image is scaled correctly
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
          width: isMobile ? '100%' : '80%', 
          cursor: 'pointer', 
          transition: 'transform 0.15s ease-in-out',
          borderRadius: '4px',
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
          <IconButton onClick={handleClose} sx={{position: 'absolute', top: 0, right: 0}}>
            <Close />
          </IconButton>
          <Image src={src} alt="Comment" sx={{ borderRadius: '4px' }} />
        </Box>
      </Modal>
    </>
  );
}

export default PostImage;
