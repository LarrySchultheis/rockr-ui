import {useEffect, useState} from 'react';
import { Autocomplete, TextField } from "@mui/material";
import SaveSuccessSnackbar from '../Snackbars/SaveSuccessSnackbar';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default function InstrumentSelect({
    user,
}) {
    const [userInstruments, setUserInstruments] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
  
    function handleChange(event, value) {
      setUserInstruments(value);
    }

    const postUserInstruments = () => {
      axiosInstance.post(`/user_instruments/${user.id}`, {
          instruments: userInstruments
      })
      .then(setOpenSnackbar(true))
      .catch( 
          (e) => console.log( e ) 
      );
    };

    useEffect(() => {
      if(user){
        axiosInstance.get(`/user_instruments/${user.id}`).then(response => {
            setUserInstruments(response?.data);
        }).then(
            axiosInstance.get('/instruments/').then(response => {
                setInstruments(response?.data);     
                setLoading(false);
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
                value={userInstruments}
                options={instruments}
                groupBy={(option) => option.type}
                getOptionLabel={(option) => option?.description}
                onChange={handleChange}
                onBlur={postUserInstruments}
                style={{ width: 300 }}
                renderInput={(params) => (
                <TextField {...params} label="Instruments" variant="outlined" />
            )}
            />
        }
        <SaveSuccessSnackbar
          component={"Instruments"}
          open={openSnackbar}
          handleSnackbarClose={handleCloseSnackbar}
        />
        </>
    );
}