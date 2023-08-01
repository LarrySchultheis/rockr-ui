import {useEffect, useState} from 'react';
import { Autocomplete, TextField } from "@mui/material";
import SaveSuccessSnackbar from '../SaveSuccessSnackbar';

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
      axiosInstance.post(`/user_goals/${user.id}`, {
          goals: userGoals
      })
      .then(setOpenSnackbar(true))
      .catch( 
          (e) => console.log( e ) 
      );
  };
  
    useEffect(() => {
      if(user){
        axiosInstance.get(`/user_goals/${user.id}`).then(response => {
            setUserGoals(response?.data);
        }).then(
            axiosInstance.get('/goals/').then(response => {
                setGoals(response?.data);     
                setLoading(false);
            })
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
                    <TextField {...params} label={"Goals"} variant="outlined" />
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