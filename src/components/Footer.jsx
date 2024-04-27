import React from 'react';

import { Typography, Link } from '@mui/material';



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
                <Link color="inherit" href="https://github.com/bob" target="_blank">
                    GitHub
                </Link>
            </Typography>
        </footer>
    );
};

export default Footer;