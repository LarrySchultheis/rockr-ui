import {useEffect, useState} from 'react';
import { Button, Grid, Stack } from '@mui/material';
import defaultAvatar from '../images/default_avatar.png'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ProfileTabs from '../components/UserProfile/ProfileTabs';
import PasswordChangeModal from '../components/UserProfile/PasswordChangeModal';
import RegistrationModal from '../components/UserProfile/RegistrationModal';
import BandInvitationResponseModal from '../components/BandManagement/BandInvitationResponseModal';
import Alert from '@mui/material/Alert';

export default function UserProfilePage(props) {
    const {user, axiosInstance, settings} = props
    const [isPaused, setIsPaused] = useState();
    
    // RegistrationModal
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);

    // BandInvitationResponseModal
    const [bandInvitations, setBandInvitations] = useState();
    const [showBandInvitationResponseModal, setShowBandInvitationResponseModal] = useState(false);
    const closeBandInvitationResponseModal = () => setShowBandInvitationResponseModal(false);

    useEffect(() => {
        if(user){
            setIsPaused(user?.is_paused);

            axiosInstance?.get(`/check_match_profile/${user.id}`)
            .then(response => {
                setShowModal(!response?.data?.is_match_profile_complete);
            })
            .catch( 
                (e) => console.log( e ) 
            );

            axiosInstance.get(`/user_bands?user=${user.id}`)
            .then(response => {
                if(response.data){
                    setBandInvitations(response.data);
                }
            })
            .catch(
                (e) => console.log( e )
            );
        }
      }, [user, axiosInstance])

    // PasswordChangeModal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const changePassword = (newPassword) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({password:  newPassword, email: user.email})
        }
        fetch(`${settings.apiUrl}/change_password`, requestOptions)
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


    const patchIsActive = () => {
        if(user){
            axiosInstance.patch(`/users/${user?.id}`, {
                params: {
                    is_paused: !isPaused
                }
            })
            .then(response => {
                setIsPaused(response?.data.is_paused);
            })
            .catch(
                (e) => console.log( e )
            );
        }
    };

    return (
        <>
        {isPaused ? <Alert severity="warning">Your account is paused. You will not receive new matches.</Alert> : <></>}
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
                            onClick={()=> setShowBandInvitationResponseModal(true)}
                            endIcon={<MailOutlineIcon/>}
                            sx={{ 
                                minWidth: '8rem',
                                mt:"1.5rem",
                            }}
                        >
                            Band Invitations
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
                            color={isPaused ? "success" : "error"}
                            variant="contained"
                            endIcon={isPaused ? <PlayArrowIcon/> : <PauseIcon/>}
                            onClick={() => patchIsActive()}
                            sx={{ 
                                minWidth: '8rem',
                                mt: "4rem"
                            }}
                        >
                            {isPaused ? "Reactivate Account" : "Pause Account"}
                        </Button>
                    </Stack>
                </Grid>
                <Grid 
                    item
                    container 
                    md={8}
                >
                    <ProfileTabs user={user} axiosInstance={axiosInstance}/>
                </Grid>
            </Grid>
            <PasswordChangeModal
                open={open}
                handleClose={handleClose}
                handleSubmit={changePassword}
            />
            <RegistrationModal
                user={user}
                showModal={showModal}
                closeModal={closeModal}
                axiosInstance={axiosInstance}
            />
            <BandInvitationResponseModal
                user={user}
                invitations={bandInvitations}
                showModal={showBandInvitationResponseModal}
                closeModal={closeBandInvitationResponseModal}
                axiosInstance={axiosInstance}
            />
        </>
    );
}
