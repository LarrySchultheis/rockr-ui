import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AllChipsArray from "./AllChipsArray";
import UserTypeButtons from "./UserTypeButtons";


export default function MatchProfileLayout(props) {
    return(
        <>
            <Grid
                item
                container
                direction="row"
                gridAutoRows={true}
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{m:"2rem", mr:"2rem", width:"40%"}}
                >
                    <UserTypeButtons user={props.user}/>
                </Stack>
                <Stack
                    sx={{m:"2rem", width:"40%"}}
                >
                    <AllChipsArray 
                        chips={props?.interests} 
                        url={`/user_musical_interests/${props.user.id}`}
                    /> 
                </Stack>
            </Grid>
            <Grid
                item
                container
                direction="row"
            >
                <Stack
                    sx={{m:"2rem", width:"40%"}}
                >
                    <AllChipsArray 
                        chips={props?.instruments}
                        url={`/user_instruments/${props.user.id}`}
                    /> 
                </Stack>
                <Stack
                    sx={{m:"2rem", width:"40%"}}
                >
                    <AllChipsArray chips={props?.goals} url={`/user_goals/${props.user.id}`}/> 
                </Stack>
            </Grid>
        </>
    );
}