import {useEffect, useState} from 'react';
import { Button, Grid, Stack } from '@mui/material';
import defaultAvatar from '../images/default_avatar.png'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ProfileTabs from '../components/UserProfile/ProfileTabs'
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });

function UserProfilePage(props) {
    const [user, setUser] = useState(null)
    useEffect(() => { 
        axiosInstance.get("/user").then(response => {
            setUser(response?.data?.data);
        
        });
        // setUser(props?.user);
    }, [])

    return (
        <>
        { user ?
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
                            endIcon={<SaveIcon />}
                            sx={{ 
                                minWidth: '8rem',
                                mt:"1.5rem",
                            }}
                        >
                            save
                        </Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            endIcon={<InsertEmoticonIcon/>}
                            sx={{ 
                                minWidth: '8rem',
                                mt:"1.5rem",
                            }}
                        >
                            preview
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
            : <Grid/>
        }
        </>
    );
}

export default UserProfilePage;