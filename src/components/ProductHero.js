import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import banner from "../images/banner.jpg"
import theme from './Theme';
import RegistrationModal from './RegistrationModal';



export default function ProductHero() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleModal = () => setOpenModal(!openModal);
  
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
      <Typography color="inherit" align="center" marked="center" variant="h2">  
        ROCKR
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
        onClick={handleModal}
      >
        Register
      </Button>
      <RegistrationModal open={openModal} handleModal={handleModal}/>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Sign-up to get started
      </Typography>
    </ProductHeroLayout>
  );
}

// CITE THIS: https://github.com/mui/material-ui/tree/master/docs/src/pages/premium-themes/onepirate