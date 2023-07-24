// REFERENCES:
//  * https://github.com/mui/material-ui/tree/master/docs/src/pages/premium-themes/onepirate

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Grid from '@mui/material/Grid';

import { useAuth0 } from '@auth0/auth0-react'


const pages = ['Matches'];
const settings = ['Account', 'Logout'];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        <Toolbar disableGutters >
          <PlayArrowIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: "3rem",
              display: { xs: 'none', md: 'flex' },
            }}
          >
            ROCKR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"  sx={{ "&:hover": { color: "#5f3af2" } }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PlayArrowIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated ?
            <>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
                <Button
                  href="/user_profile"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Profile
                </Button>
                <Button
                  href="/messages"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Messages
                </Button>
              </>
              : <></>
            }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            { isAuthenticated ? 
                <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircleIcon></AccountCircleIcon>
                  </IconButton>
                </Tooltip>
                {props.role && props.role.name === "Admin" &&
                  <Button
                    href="/admin_management"
                    color="secondary"
                  >
                    Admin Management
                  </Button>
                }

                <Button
                  color="secondary"
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin,
                    })
                  }
                >
                  Logout
                </Button>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
              :
              <Grid container spacing={2}>
                <Grid item grid-xs-auto>
                    <Button
                      isNewUser={false}
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        loginWithRedirect();

                      }}
                    >
                    Log In
                    </Button>
                </Grid>
                <Grid item sgrid-xs-auto>
                    <Button
                      isNewUser={true}
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        loginWithRedirect({authorizationParams: {screen_hint: "signup"}, appState: { returnTo: `${window.location.origin}/user_profile`}});
                      }}
                    >
                      Sign up
                    </Button>
                </Grid>  
              </Grid>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
