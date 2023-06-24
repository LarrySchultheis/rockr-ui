import * as React from 'react';
import ProductHero from '../components/ProductHero';
import ProductFeatures from '../components/ProductFeatures';

function LandingPage() {
  return (
    <React.Fragment>
        <ProductHero />
        <ProductFeatures />
    </React.Fragment>
  );
}

export default LandingPage;

// CITE THIS: https://github.com/mui/material-ui/tree/master/docs/src/pages/premium-themes/onepirate