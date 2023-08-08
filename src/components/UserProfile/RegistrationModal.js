// import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import UserTypeButtons from "../MatchProfile/UserTypeButtons";
import InstrumentSelect from "../MatchProfile/InstrumentsSelect";
import InterestsSelect from "../MatchProfile/InterestsSelect";
import GoalsSelect from "../MatchProfile/GoalsSelect";

const style = theme => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height:'75%',
  bgcolor: "text.secondary",
  boxShadow: 24,
  p: "1rem",
  m: "1rem",
  overflow:"scroll",
  borderRadius: 10,
});


function RegistrationModal(props) {
  const{user, showModal, closeModal, axiosInstance} = props;

  return (
    <div>
      { user ? 
        <Modal open={showModal}>
          <Stack alignItems="center" sx={style} spacing={5}>
            <Grid container spacing={2}>
              <Grid container item xs={11} direction="column">
              <Typography variant="h6" color="text.primary">
                  Complete your match profile to help us connect you with other Rockrs!
              </Typography>
              </Grid>
              <Grid container item xs={1} direction="column" >
                <IconButton onClick={() => closeModal()}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
            <UserTypeButtons user={user} axiosInstance={axiosInstance} sx={{p:"1rem"}}/>
            <InterestsSelect user={user} axiosInstance={axiosInstance} sx={{p:"1rem"}}/>
            <InstrumentSelect user={user} axiosInstance={axiosInstance} sx={{p:"1rem"}}/>
            <GoalsSelect user={user} axiosInstance={axiosInstance} sx={{p:"1rem"}}/>
            <Button
                color="primary"
                variant="contained" 
                onClick={() => {closeModal()}}
            >
                Submit
            </Button>
          </Stack>
        </Modal>
      : <></>}
    </div>
  )
};

export default RegistrationModal;