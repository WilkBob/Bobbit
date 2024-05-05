import { NavAvatar } from './NavAvatar';
import { MenuDesktop } from './MenuDesktop';
import { MenuMobile } from './MenuMobile';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext, useState} from 'react';
import  Button  from '@mui/material/Button';
import  Login  from '@mui/icons-material/Login';

const pages = ['Home', 'Forums', 'About', 'Contact'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const {user} = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuDesktop   handleOpenNavMenu={handleOpenNavMenu} anchorElNav={anchorElNav} Boolean={Boolean} handleCloseNavMenu={handleCloseNavMenu} pages={pages}  />
          <MenuMobile   pages={pages} handleCloseNavMenu={handleCloseNavMenu}  />

         {user && <NavAvatar   handleOpenUserMenu={handleOpenUserMenu} anchorElUser={anchorElUser} Boolean={Boolean} handleCloseUserMenu={handleCloseUserMenu} settings={settings} Link={Link} user={user}  />}
         {!user && <Button variant='outlined' LinkComponent={Link} to='/login'>sign in<Login/></Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;