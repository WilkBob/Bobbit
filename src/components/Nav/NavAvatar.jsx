import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
export function NavAvatar({
  handleOpenUserMenu,
  anchorElUser,
  Boolean,
  handleCloseUserMenu,
  settings,
  Link,
  user
}) {

return (
    <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
        </Tooltip>
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                        component={Link}
                        to={`/${setting}`}
                        textAlign="center"
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                        
                    >
                        {setting}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    </Box>
);
}
  