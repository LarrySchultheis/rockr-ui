import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Typography, Container } from '@mui/material';

export default function AppFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: "105vh",
      }}
    > 
    <Box
      sx={{
        marginTop: "auto",
        p: 4,
        bgcolor: 'secondary.light',
      }}
      component="footer"
    >
      <Typography>
        <Container sx={{my: 8, display: 'flex'}}>
            <Grid item xs={6} sm={4} md={2}
            >
              <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="">Terms</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="">Privacy</Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={8} md={4} />
            <Grid item/>
        </Container>
      </Typography>
    </Box>
  </Box>
  );
}

//CITE THIS: https://github.com/mui/material-ui/tree/master/docs/src/pages/premium-themes/onepirate
