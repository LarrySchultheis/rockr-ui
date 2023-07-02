import {useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import AllChipsArray from "./AllChipsArray";
import UserTypeButtons from "./UserTypeButtons";
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });

export default function MatchProfileLayout() {
    const [instruments, setInstruments] = useState(null);
    const [goals, setGoals] = useState(null)
    const [interests, setInterests] = useState(null)
    
    useEffect(() => { 
        axiosInstance.get("/instrument").then(response => {
          setInstruments(response?.data?.data);
        });

        axiosInstance.get("/goal").then(response => {
            setGoals(response?.data?.data);
          });

        axiosInstance.get("/musical_interest").then(response => {
            setInterests(response?.data?.data);
        });
    }, [])

    // useEffect(() => {
    //         axiosInstance.get("/goal").then(response => {
    //             setGoals(response?.data?.data);
    //       });
    // }, [])

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
                    <UserTypeButtons/>
                </Stack>
                <Stack
                    sx={{m:"2rem", width:"40%"}}
                >
                    {
                        interests 
                        ? <AllChipsArray chips={interests}/> 
                        : <></>
                    }
                    
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
                    {
                        instruments 
                        ? <AllChipsArray chips={instruments}/> 
                        : <></>
                    }
                </Stack>
                <Stack
                    sx={{m:"2rem", width:"40%"}}
                >
                    {
                        goals 
                        ? <AllChipsArray chips={goals}/> 
                        : <></>
                    }
                </Stack>
            </Grid>
        </>
    );
}