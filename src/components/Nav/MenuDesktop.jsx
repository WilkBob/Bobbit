import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";

export function MenuDesktop({
    handleOpenNavMenu,
    anchorElNav,
    Boolean,
    handleCloseNavMenu,
    pages
}) {
    return (
        <>
            <AdbIcon
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    mr: 1,
                    color: '#cf7753'
                }}
            />
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
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
                    display: { xs: 'flex', md: 'none' }
                }}
            >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' }
                    }}
                >
                    {pages.map(page => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography
                                component={Link}
                                to={`/${page === 'Home' ? '' : page.toLowerCase()}`}
                                textAlign="center"
                                sx={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                {page}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </>
    );
}
