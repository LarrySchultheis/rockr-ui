// REFERENCES:
//  * https://github.com/mui/material-ui/tree/master/docs/src/pages/premium-themes/onepirate

import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import banner from "../images/banner.jpg"
import rockrlogo from "../images/Rockr_Logo.png"
import theme from './Theme';
import { useAuth0 } from '@auth0/auth0-react';



export default function ProductHero() {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${banner})`,
        backgroundColor: theme.primary,
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={banner}
        alt="increase priority"
      />
      <img
        style={{ display: 'none' }}
        src={rockrlogo}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" marked="center" variant="h2">  
        Welcome to ROCKR!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Connect with local musicians today!
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        sx={{ minWidth: 200 }}
        onClick={() => loginWithRedirect({authorizationParams: {screen_hint: "signup"}, appState: { returnTo: `${window.location.origin}/user_profile`}})}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Sign-up to get started
      </Typography>
    </ProductHeroLayout>
  );
}
