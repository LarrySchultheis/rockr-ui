import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import GoalSelection from "./GoalSelection";
import InstrumentSelection from "./InstrumentSelection";
import UserTypeButtons from "./UserTypeButtons";
import {getInstruments} from "../../api/endpoints";


export default function MatchProfileLayout() {
    // const instruments = getInstruments;
    const i_list=[
        { key: 1, label: "bass" },
        { key: 2, label: "electric guitar" },
        { key: 3, label: "acoustic guitar" }
    ]
    const [instruments, setInstruments] = React.useState(null);
    
    React.useEffect(() => {
        setInstruments(i_list);
    }, [])

    return(
        <>
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                gridAutoRows={true}
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{mb:"2rem", mr:"2rem", width:"48%"}}
                >
                    <UserTypeButtons/>
                </Stack>
                <Stack
                    sx={{mb:"2rem", width:"48%"}}
                >
                    <GoalSelection chips={i_list} />
                </Stack>
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Stack
                    sx={{mr:"2rem", width:"48%"}}
                >
                <GoalSelection/>
                </Stack>
                <Stack
                    sx={{width:"48%"}}
                >
                    <GoalSelection/>
                </Stack>
            </Grid>
        </>
    );
}