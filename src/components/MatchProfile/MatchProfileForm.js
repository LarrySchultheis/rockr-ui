import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import UserTypeButtons from "./UserTypeButtons";
import InstrumentSelect from './InstrumentsSelect';
import InterestsSelect from './InterestsSelect';
import GoalsSelect from './GoalsSelect';
import { Button, ButtonGroup } from '@mui/material';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
});

const handleBandAccept = (user_id, band_id) => {
    axiosInstance.patch(`/users/${props?.user?.id}`, {
      params: {
        band_id: band_id,
        is_verified: True
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

const addUserBandFunc = (user_id, band_id) => {
    axiosInstance.post(`/user_band/${user_id}`, {
        params: {
            band_id: band_id
        }
      })
      .catch(error => {
        console.log(error);
      });
};

const removeUserBandFunc = (user_id, band_id) => {
    axiosInstance.delete(`/user_band/${user_id}`, {
        params: {
            band_id: band_id
        }
      })
      .catch(error => {
        console.log(error);
      });
};

export default function MatchProfileForm({
    user
}) {
    return(
        <>
            <Grid item container direction="row" gridAutoRows={true}>
                <Stack justifyContent="center" alignItems="center" sx={{m:"2rem", mr:"2rem", width:"40%"}}>
                    <UserTypeButtons user={user}/>
                </Stack>
                <Stack sx={{m:"2rem", width:"40%"}}>
                    <InterestsSelect user={user}/>
                </Stack>
            </Grid>
            <Grid item container direction="row">
                <Stack sx={{m:"2rem", width:"40%"}}>
                    <InstrumentSelect user={user}/>
                </Stack>
                <Stack sx={{m:"2rem", width:"40%"}}>
                    <GoalsSelect user={user}/>
                </Stack>
            </Grid>
            <ButtonGroup style={{ margin: "auto" }} 
                variant="contained">
                <Button onClick={() => {
                    addUserBandFunc(user?.id);
                }}>Add To Band</Button>
                <Button onClick={() => {
                    handleBandAccept(user?.id);
                }}>Accept Band Request</Button>
                <Button onClick={() => {
                    removeUserBandFunc(user?.id);
                }}>Remove From Band</Button>
            </ButtonGroup>
        </>
    );
}