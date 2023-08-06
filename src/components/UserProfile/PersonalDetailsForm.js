// REFERENCES: 
//     * https://mui.com/material-ui/react-text-field/#system-TextFieldHiddenLabel.js
//     * https://mui.com/material-ui/react-select/#system-BasicSelect.js 

import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Typography, Checkbox } from '@mui/material';
import SaveSuccessSnackbar from '../Snackbars/SaveSuccessSnackbar';

export default function PersonalDetailsForm(props) {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [isPaused, setIsPaused] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const {user, axiosInstance} = props;

    useEffect(() => {
        setFirstname(user?.first_name);
        setLastname(user?.last_name);
        setUsername(user?.username);
        setIsPaused(user?.is_paused);

        if(user){
            axiosInstance?.get(`/match_profiles/${user?.id}`)
            .then(response => {
                setBio(response?.data.bio);
            })
            .catch(
                (e) => console.log( e )
            );
        }
    }, [user, axiosInstance])

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value)
    };
    const patchFirstname = (event) => {
        axiosInstance?.patch(`/users/${user?.id}`, {
            params:{
                first_name: event.target.value
            }
        })
        .then(response => {
            setFirstname(response?.data.first_name);
            setOpenSnackbar(true);
        })
        .catch(
            (e) => console.log( e )
        );
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value)
    };
    const patchLastname = (event) => {
        axiosInstance?.patch(`/users/${user?.id}`, {
            params: {
                last_name: event.target.value
            }
        })
        .then(response => {
            setLastname(response?.data.last_name);
            setOpenSnackbar(true);
        })
        .catch(
            (e) => console.log( e )
        );
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };
    const patchUsername = (event) => {
        axiosInstance?.patch(`/users/${user?.id}`, {
            params:{
                username: event.target.value
            }
        })
        .then(response => {
            setUsername(response?.data.username);
            setOpenSnackbar(true);
        })
        .catch(
            (e) => console.log( e )
        );
    };

    const handleBioChange = (event) => {
        setBio(event.target.value)
    };
    const patchBio = (event) => {
        axiosInstance?.patch(`/match_profiles/${user?.id}`, {
            params:{
                bio: event.target.value
            }
        })
        .then(response => {
            setBio(response?.data.bio);
            setOpenSnackbar(true);
        })
        .catch(
            (e) => console.log( e )
        );
    };

    const patchIsActive = (event) => {
        axiosInstance.patch(`/users/${user?.id}`, {
            params: {
                is_paused: event.target.checked
            }
        })
        .then(response => {
            setIsPaused(!response?.data.is_paused);
            setOpenSnackbar(true);
        })
        .catch(
            (e) => console.log( e )
        );
    };

    return (
        <form id="userForm">
        <Stack
            component="form"
            alignItems="center"
        >
            <TextField
                hiddenLabel
                label={<Typography color='text.primary'>First Name</Typography>}
                placeholder="First Name"
                variant="standard"
                color="primary"
                sx={{minWidth: "15rem", mt: "2rem", mb: "1.5rem"}}
                value={firstname}
                onChange={handleFirstnameChange}
                onBlur={patchFirstname}
            />
            <TextField
                hiddenLabel
                required={true}
                label={<Typography color='text.primary'>Last Name</Typography>}
                placeholder="Last Name"
                variant="standard"
                color="primary"
                sx={{minWidth: "15rem", mb: "1.5rem"}}
                value={lastname}
                onChange={handleLastnameChange}
                onBlur={patchLastname}
            />
            <TextField
                hiddenLabel
                required={true}
                label={<Typography color='text.primary'>Username</Typography>}
                placeholder="Username"
                variant="standard"
                color="primary"
                sx={{minWidth: "15rem", mb: "1.5rem"}}
                value={username}
                onChange={handleUsernameChange}
                onBlur={patchUsername}
            />
            <TextField
                id="outlined-multiline-static"
                label={<Typography color='text.primary'>Bio</Typography>}
                multiline
                rows={4}
                placeholder="Fill out your bio to let other Rockrs know what you're all about!"
                sx={{width:"100%"}}
                value={bio}
                onChange={handleBioChange}
                onBlur={patchBio}
            />
            <Typography sx={{mt:"1rem"}} color='text.primary'>Pause Account?</Typography>
            <Checkbox
                sx={{color: "black", '&.Mui-checked': {color: "primary"}} }
                label="Pause Account"
                checked={isPaused}
                onChange={patchIsActive}
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

