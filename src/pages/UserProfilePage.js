import * as React from 'react';

import { Button, Grid, Stack } from '@mui/material';
import defaultAvatar from '../images/default_avatar.png'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ProfileTabs from '../components/UserProfile/ProfileTabs'


function UserProfilePage() {
    return (
        <Grid 
            container
            direction='row'
            sx={{ mt:"3rem", mb: "3rem", ml:"1.5rem", mr:"1.5rem"}}
        >
            <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                md={3}
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                >
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
                <ProfileTabs />
            </Grid>
        </Grid>
    );
}

export default UserProfilePage;