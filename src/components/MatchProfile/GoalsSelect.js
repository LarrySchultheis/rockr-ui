import {useEffect, useState} from 'react';
import { Autocomplete, TextField, Typography } from "@mui/material";
import SaveSuccessSnackbar from '../Snackbars/SaveSuccessSnackbar';

export default function GoalsSelect(props) {
    const [userGoals, setUserGoals] = useState([]);
    const [goals, setGoals] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const {user, axiosInstance} = props;
  
    function handleChange(event, value) {
      setUserGoals(value);
    }

    const postUserGoals = () => {
      axiosInstance?.post(`/user_goals/${user.id}`, {
          goals: userGoals
      })
      .then(setOpenSnackbar(true))
      .catch( 
          (e) => console.log( e ) 
      );
  };
  
    useEffect(() => {
      if(user){
        axiosInstance?.get(`/user_goals/${user.id}`).then(response => {
            setUserGoals(response?.data);
        }).then(
            axiosInstance?.get('/goals/').then(response => {
                setGoals(response?.data);     
                setLoading(false);
            }).catch( 
                (e) => console.log( e ) 
            )
        )
      }
    }, [user, axiosInstance])
    
    return(
        <>
        { isLoading ?
            <></> :
            <Autocomplete
                multiple
                value={userGoals}
                options={goals}
                getOptionLabel={(option) => option?.description}
                style={{ width: 300 }}
                onChange={handleChange}
                onBlur={postUserGoals}
                renderInput={(params) => (
                    <TextField {...params} label={<Typography color='text.primary'>Goals</Typography>} variant="outlined" />
                )}
            />
        }
        <SaveSuccessSnackbar
            component={"Goals"}
            open={openSnackbar}
            handleSnackbarClose={handleCloseSnackbar}
        />
        </>
    );
}