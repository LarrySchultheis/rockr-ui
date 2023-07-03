// REFERENCES:
//  * https://mui.com/material-ui/react-toggle-button/#system-ToggleButtons.js
//  * https://static.thenounproject.com/png/643342-200.png 
//  * https://cdn-icons-png.flaticon.com/512/431/431249.png

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import indv from '../../images/individual.png'
import band from '../../images/band.png';

export default function UserTypeButtons() {
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    return(
        <Grid
            container
            width
        >
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                sx={{width:"100%"}}
            >
                <ToggleButton value="left" aria-label="left aligned" sx={{p:"1rem", width:"48%"}}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{width:"100%"}}
                    >
                        Individual
                        <img src={indv} alt={"Individual"} style={{maxWidth: '75%'}}/>
                    </Stack>
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned" sx={{p:"1rem", width:"48%"}}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{width:"100%"}}
                    >
                        Band
                        <img src={band} alt={"Band"} style={{maxWidth: '85%'}}/>
                    </Stack>
                </ToggleButton>
            </ToggleButtonGroup>
        </Grid>
    );
}
