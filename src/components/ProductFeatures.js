import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import curvyLines from "../images/curvyLines.png"
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductFeatures() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src={curvyLines}
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <HeadphonesIcon fontSize='large'/>
              <Typography variant="h6" sx={{ my: 5 }}>
                Feature #1
              </Typography>
              <Typography variant="h5">
              {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod '
                }
                {
                    'tempor incididunt ut labore et dolore magna aliqua.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Diversity3Icon fontSize='large'/>
              <Typography variant="h6" sx={{ my: 5 }}>
                Feature #2
              </Typography>
              <Typography variant="h5">
                {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod '
                }
                {
                    'tempor incididunt ut labore et dolore magna aliqua.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
                <MusicNoteIcon fontSize='large'/>
              <Typography variant="h6" sx={{ my: 5 }}>
                Feature #3
              </Typography>
              <Typography variant="h5">
                {
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod '
                }
                {
                    'tempor incididunt ut labore et dolore magna aliqua.'
                }
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductFeatures;

// CITE THIS
//https://github.com/mui/material-ui/blob/master/docs/public/static/themes/onepirate/appCurvyLines.png
