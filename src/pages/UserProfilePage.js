import {useEffect, useState} from 'react';
import { Button, Grid, Stack } from '@mui/material';
import defaultAvatar from '../images/default_avatar.png'
import DeleteIcon from '@mui/icons-material/Delete';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ProfileTabs from '../components/UserProfile/ProfileTabs';
import PasswordChangeModal from '../components/PasswordChangeModal';
// import axios from 'axios';


// const axiosInstance = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });

function UserProfilePage(props) {
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
      setUser(props?.user)
    }, [props?.user])

    const changePassword = (newPassword) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({password:  newPassword, email: user.email})
        }
        fetch('http://localhost:5000/change_password', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                alert("Password successfully updated")
                handleClose();
            }
            else {
                alert("Error updating password");
                handleClose();
            }
        })
    }

    return (
        <>
            <Grid 
                container
                direction='row'
                justifyContent="center"
                alignItems="center"
                sx={{ mt:"3rem", mb: "3rem", ml:"1.5rem", mr:"1.5rem"}}
            >
                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    md={3}
                >
                    <Stack>
                        <img src={defaultAvatar} alt="Avatar" style={{maxWidth: '12rem'}}/>
                        <Button
                            color="primary"
                            variant="contained"
                            endIcon={<InsertEmoticonIcon/>}
                            sx={{ 
                                minWidth: '8rem',
                                mt:"1.5rem",
                            }}
                        >
                            preview
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleOpen()}
                            sx={{
                                minWidth: '8rem',
                                mt:"1.5rem",
                            }}
                        >
                            update password
                        </Button>
                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<DeleteIcon/>}
                            sx={{ 
                                minWidth: '8rem',
                                mt: "4rem"
                            }}
                        >
                            delete
                        </Button>
                    </Stack>
                </Grid>
                <Grid 
                    item
                    container 
                    md={8}
                >
                    <ProfileTabs user={user}/>
                </Grid>
            </Grid>
        <PasswordChangeModal
            open={open}
            handleClose={handleClose}
            handleSubmit={changePassword}
        >
        </PasswordChangeModal>
        </>
    );
}

export default UserProfilePage;