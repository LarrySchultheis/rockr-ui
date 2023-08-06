import {useEffect, useState} from 'react';
import { Autocomplete, TextField } from "@mui/material";
import SaveSuccessSnackbar from '../Snackbars/SaveSuccessSnackbar';

export default function InstrumentSelect(props) {
    const [userInstruments, setUserInstruments] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const {user, axiosInstance} = props;
  
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
    }, [user, axiosInstance])
    
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