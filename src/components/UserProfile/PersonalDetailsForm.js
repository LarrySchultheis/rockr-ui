// REFERENCES: 
//     * https://mui.com/material-ui/react-text-field/#system-TextFieldHiddenLabel.js
//     * https://mui.com/material-ui/react-select/#system-BasicSelect.js 

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import SaveSuccessSnackbar from '../SaveSuccessSnackbar';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });

export default function PersonalDetailsForm({
    user
}) {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    useEffect(() => {
        setFirstname(user?.first_name)
        setLastname(user?.last_name)
    }, [user])

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value)
    };
    const patchFirstname = (event) => {
        axiosInstance.patch(`/users/${user?.id}`, {
            params:{
                first_name: event.target.value
            }
        })
        .then(response => {
            setFirstname(response?.data.first_name);
            setOpenSnackbar(true)
        })
        .catch(
            (e) => console.log( e )
        );
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value)
    };
    const patchLastname = (event) => {
        axiosInstance.patch(`/users/${user?.id}`, {
            params: {
                last_name: event.target.value
            }
        })
        .then(response => {
            setLastname(response?.data.last_name);
            setOpenSnackbar(true)
        })
        .catch(
            (e) => console.log( e )
        );
    };

    const [isActive, setIsActive] = useState(props?.user?.is_active || false);
    //Pause Account
    const handleCheckboxToggle = (event) => {
        setIsActive(event.target.value);
    }

    return (
        <form id="userForm">
            <Typography sx={{mt: "2rem", mb:"2rem"}} color='#8A8A8A' variant="h4">Personal Details</Typography>
        <Stack
            component="form"
            alignItems="center"
        >
            <TextField
                hiddenLabel
                name="firstname"
                placeholder="First Name"
                variant="standard"
                color="primary"
                sx={{minWidth: "15rem", mb: "1.5rem"}}
                value={firstname}
                onChange={handleFirstnameChange}
                onBlur={patchFirstname}
            />
            <TextField
                hiddenLabel
                required={true}
                name="lastname"
                placeholder="Last Name"
                variant="standard"
                color="primary"
                sx={{minWidth: "15rem", mb: "1.5rem"}}
                value={lastname}
                onChange={handleLastnameChange}
                onBlur={patchLastname}
            />
            <Typography sx={{mt: "2rem", mb:"2rem"}} color='#000000'>Pause Account?</Typography>
            <Checkbox
                sx={{color: "black", '&.Mui-checked': {color: "primary"}} }
                label="Label"
                defaultChecked={isActive}
                onChange={handleCheckboxToggle}
            />
        </Stack>
        <SaveSuccessSnackbar
            component={"Personal Details"}
            open={openSnackbar}
            handleSnackbarClose={handleCloseSnackbar}
        />
    </form>
  );
}

