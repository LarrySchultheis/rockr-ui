import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import UserTypeButtons from "./UserTypeButtons";
import InstrumentSelect from './InstrumentsSelect';
import InterestsSelect from './InterestsSelect';
import GoalsSelect from './GoalsSelect';
import { Button, ButtonGroup } from '@mui/material';

const addUserBandFunc = (user_id) => {
    fetch(`http://localhost:5000/add_user_band?id=${user_id}`)
    .then((response) => { 
        if(response.status !== 201) {
            alert("Error adding band member")
        }
    })
}

const removeUserBandFunc = (user_id, band_id) => {
    fetch(`http://localhost:5000/remove_user_band?id=${user_id}`)
    .then((response) => { 
        if(response.status !== 204) {
            alert("Error removing band member")
        }
    })
}

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
                    removeUserBandFunc(user?.id);
                }}>Remove From Band</Button>
            </ButtonGroup>
        </>
    );
}