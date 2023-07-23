// REFERENCES: 
//     * https://mui.com/material-ui/react-text-field/#system-TextFieldHiddenLabel.js
//     * https://mui.com/material-ui/react-select/#system-BasicSelect.js 

import { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Typography,Checkbox } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function PersonalDetailsForm(props) {
    const [firstname, setFirstname] = useState(props?.user?.first_name || "")
    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
    };

    const [lastname, setLastname] = useState(props?.user?.last_name || "")
    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    };

    const [gender, setGender] = useState(1);
    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const [isActive, setIsActive] = useState(props?.user?.is_active || false);
    //Pause Account
    const handleCheckboxToggle = (event, newIsActive) => {
        setIsActive(newIsActive);
        axiosInstance.patch(`/users/${props?.user?.id}`, {
          params: {
            is_active: newIsActive
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

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
            />
            <Select
                labelId="gender-select"
                id="gender-select"
                name="gender"
                value={gender}
                label="Gender"
                placeholder='Gender'
                onChange={handleChange}
                sx={{ minWidth: "15rem", mb: "1.5rem"}}
            >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
                <MenuItem value={3}>Non-binary</MenuItem>
                <MenuItem value={4}>Prefer not to say</MenuItem>
            </Select>
            <Typography sx={{mt: "2rem", mb:"2rem"}} color='#000000'>Pause Account?</Typography>
            <Checkbox
                sx={{color: "black", '&.Mui-checked': {color: "primary"}} }
                label="Label"
                defaultChecked={isActive}
                onChange={handleCheckboxToggle}
            />
        </Stack>
    </form>
  );
}