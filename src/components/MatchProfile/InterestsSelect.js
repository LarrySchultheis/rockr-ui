import {useEffect, useState} from 'react';
import { Autocomplete, TextField, Typography } from "@mui/material";
import SuccessSnackbar from '../SuccessSnackbar';

export default function InterestsSelect(props) {
    const [userInterests, setUserInterests] = useState([]);
    const [interests, setInterests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const {user, axiosInstance} = props;
  
    function handleChange(event, value) {
      setUserInterests(value);
    }

    const postUserInterests = () => {
      axiosInstance?.post(`/user_musical_interests/${user.id}`, {
          interests: userInterests
      })
      .then(setOpenSnackbar(true))
      .catch( 
          (e) => console.log( e ) 
      );
  };

    useEffect(() => {
      if(user){
        axiosInstance?.get(`/user_musical_interests/${user.id}`).then(response => {
          setUserInterests(response?.data);
        }).then(
          axiosInstance?.get('/musical_interests/').then(response => {
              setInterests(response?.data);   
              setIsLoading(false);  
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
            value={userInterests}
            options={interests}
            getOptionLabel={(option) => option?.description}
            onChange={handleChange}
            onBlur={postUserInterests}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={<Typography color='text.primary'>Musical Interests</Typography>} variant="outlined" />
          )}
        />
      }
      <SuccessSnackbar
        message={"Your changes to Musical Interests have been saved!"}
        open={openSnackbar}
        handleSnackbarClose={handleCloseSnackbar}
      />
      </>
    );
}