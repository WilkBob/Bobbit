import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";

export function MenuMobile({
    pages,
    handleCloseNavMenu
}) {
    return (
        <>
            <AdbIcon
                sx={{
                    display: {
                        xs: 'flex',
                        md: 'none'
                    },
                    mr: 1,
                    color: '#cf7753'
                }}
            />
            <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/"
                sx={{
                    mr: 2,
                    display: {
                        xs: 'flex',
                        md: 'none'
                    },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#cf7753',
                    textDecoration: 'none'
                }}
            >
                Bobbit
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    display: {
                        xs: 'none',
                        md: 'flex'
                    }
                }}
            >
                {pages.map(page => (
                    <Button
                        key={page}
                        component={Link}
                        to={`/${page === 'Home' ? '' : page.toLowerCase()}`}
                        onClick={handleCloseNavMenu}
                        sx={{
                            my: 2,
                            color: 'white',
                            display: 'block'
                        }}
                    >
                        {page}
                    </Button>
                ))}
            </Box>
        </>
    );
}