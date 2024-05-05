import React from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import  GitHub  from '@mui/icons-material/GitHub';



const Footer = () => {

    return (
        <footer
            style={{
                marginTop: 'auto',
                padding: '1rem',
                height: '100px',
            }}
        >
            <Typography variant="body2" color="textSecondary" align="center">
                Made with love by Bob
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <IconButton href="https://github.com/wilkbob" target="_blank">
                    <GitHub />
                </IconButton>
                <a
                    href="https://github.com/wilkbob"
                    target="_blank"
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': {
                            color: 'blue',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    GitHub
                </a>
            </Typography>
        </footer>
    );
};

export default Footer;