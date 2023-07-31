// REFERENCES:
//  * https://mui.com/material-ui/react-toggle-button/#system-ToggleButtons.js
//  * https://static.thenounproject.com/png/643342-200.png 
//  * https://cdn-icons-png.flaticon.com/512/431/431249.png

import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import indv from '../../images/individual.png'
import band from '../../images/band.png';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://18.220.27.37:5000",
    headers: {
      "Content-Type": "application/json"
    }
});

export default function UserTypeButtons(props) {
    const [alignment, setAlignment] = useState(props.user.is_band);

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
      axiosInstance.patch(`/users/${props?.user?.id}`, {
        params: {
          is_band: newAlignment
        }
      })
      .catch(error => {
        console.log(error);
      });
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
                <ToggleButton value={false} aria-label="left aligned" sx={{p:"1rem", width:"48%"}}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{width:"100%"}}
                    >
                        Individual
                        <img src={indv} alt={"Individual"} style={{maxWidth: '75%'}}/>
                    </Stack>
                </ToggleButton>
                <ToggleButton value={true} aria-label="right aligned" sx={{p:"1rem", width:"48%"}}>
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
