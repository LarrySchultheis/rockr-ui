// REFERENCES:
//  * https://github.com/mui/material-ui/tree/master/docs/src/pages/premium-themes/onepirate

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import rockrLogo from '../images/logo.png';
import { useAuth0 } from '@auth0/auth0-react'

function ResponsiveAppBar(props) {
  const { isAuthenticated, loginWithRedirect, logout} = useAuth0();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
          <Toolbar disableGutters >
          <img
            src={rockrLogo}
            alt="Logo"
            style={{width: '10%', padding: '1rem'}}
            href={window.location.origin}
          />
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
                <Button
                  href="/matches"
                  sx={{ my: 2, color: 'white', display: 'block', ml:2, mr:2, ':hover': {
                      bgcolor: 'primary',
                      clor: 'secondary',
                    }
                  }}
                >
                Matches
                </Button>
                <Button
                  href="/user_profile"
                  sx={{ my: 2, color: 'white', display: 'block', ml:2, mr:2  }}
                >
                Profile
                </Button>
                <Button
                  href="/messages"
                  sx={{ my: 2, color: 'white', display: 'block', ml:2, mr:2  }}
                >
                Messages
                </Button>
                {props.role && props.role.name === "Admin" &&
                  <Button
                    href="/admin_management"
                    sx={{ my: 2, color: 'white', display: 'block', ml:2, mr:2  }}
                  >
                    Admin Management
                  </Button>
                }
              </>
              : <></>
            }
          </Box>
          <Box>
            { isAuthenticated ? 
                <>
                <AccountCircleIcon color="secondary"/>
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
              </>
              :
              <Grid container spacing={2}>
                <Grid item grid-xs-auto="true">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        loginWithRedirect();
                      }}
                    >
                    Log In
                    </Button>
                </Grid>
                <Grid item sgrid-xs-auto="true">
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        loginWithRedirect({
                          authorizationParams: {screen_hint: "signup"}, 
                          appState: { returnTo: `${window.location.origin}/`}
                        });
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
