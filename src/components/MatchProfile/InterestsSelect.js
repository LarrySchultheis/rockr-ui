import {useEffect, useState} from 'react';
import { Autocomplete, TextField } from "@mui/material";
import SaveSuccessSnackbar from '../SaveSuccessSnackbar';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default function InterestsSelect({
    user,
}) {
    const [userInterests, setUserInterests] = useState([]);
    const [interests, setInterests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
  
    function handleChange(event, value) {
      setUserInterests(value);
    }

    const postUserInterests = () => {
      axiosInstance.post(`/user_musical_interests/${user.id}`, {
          interests: userInterests
      })
      .then(setOpenSnackbar(true))
      .catch( 
          (e) => console.log( e ) 
      );
  };

    useEffect(() => {
      if(user){
        axiosInstance.get(`/user_musical_interests/${user.id}`).then(response => {
          setUserInterests(response?.data);
        }).then(
          axiosInstance.get('/musical_interests/').then(response => {
              setInterests(response?.data);   
              setIsLoading(false);  
          })
        )
      }
    }, [user])

    return(
      <>
      { isLoading ?
          <></> :
          <Autocomplete
            multiple
            value={userInterests}
            options={interests}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option?.description}
            onChange={handleChange}
            onBlur={postUserInterests}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Musical Interests" variant="outlined" />
          )}
        />
      }
      <SaveSuccessSnackbar
        component={"Musical Interests"}
        open={openSnackbar}
        handleSnackbarClose={handleCloseSnackbar}
      />
      </>
    );
}