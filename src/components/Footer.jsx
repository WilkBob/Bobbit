import React from 'react';

import { Typography, Link, IconButton } from '@mui/material';
import { GitHub } from '@mui/icons-material';



const Footer = () => {

    return (
        <footer style={{
            marginTop: 'auto',
            padding: '1rem',
            height: '100px',
        
        }}>
            <Typography variant="body2" color="textSecondary" align="center">
                Made with love by Bob
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <IconButton href="https://github.com/wilkbob" target="_blank">
                    <GitHub />
                </IconButton>
                <a href="https://github.com/wilkbob" target="_blank"
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        color: 'blue',
                        textDecoration: 'underline'
                    
                }}}
                >GitHub</a>
            </Typography>
        </footer>
    );
};

export default Footer;