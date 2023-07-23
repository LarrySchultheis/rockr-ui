import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AllChipsArray from "./AllChipsArray";
import UserTypeButtons from "./UserTypeButtons";
import { Button, ButtonGroup } from '@mui/material';

const addUserBandFunc = (user_id) => {
    fetch(`http://localhost:5000/add_user_band?id=${band_id}`)
    .then((response) => { 
        if(response.status != 201) {
            alert("Error adding band member")
        }
    })
}

const removeUserBandFunc = (user_id, band_id) => {
    fetch(`http://localhost:5000/remove_user_band?id=${user_id}`)
    .then((response) => { 
        if(response.status != 204) {
            alert("Error removing band member")
        }
    })
}

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
            <ButtonGroup style={{ margin: "auto" }} 
                variant="contained">
                <Button onClick={() => {
                    addUserBandFunc(props.user.id);
                }}>Add To Band</Button>
                <Button onClick={() => {
                    removeUserBandFunc(props.user.id);
                }}>Remove From Band</Button>
            </ButtonGroup>
        </>
    );
}