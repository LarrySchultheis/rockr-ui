import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import UserTypeButtons from "./UserTypeButtons";
import InstrumentSelect from './InstrumentsSelect';
import InterestsSelect from './InterestsSelect';
import GoalsSelect from './GoalsSelect';

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
        </>
    );
}