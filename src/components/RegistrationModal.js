// import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PersonalDetailsForm from './UserProfile/PersonalDetailsForm'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import UserTypeButtons from "./MatchProfile/UserTypeButtons";
import InstrumentSelect from "./MatchProfile/InstrumentsSelect";
import InterestsSelect from "./MatchProfile/InterestsSelect";
import GoalsSelect from "./MatchProfile/GoalsSelect";

const style = theme => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height:'75%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow:"scroll",
});


function RegistrationModal({
  user,
  showModal,
  closeModal
}) {

  return (
    <div>
      { user ? 
        <Modal open={showModal}>
          <Stack alignItems="center" sx={style}>
            <PersonalDetailsForm/>
            <Divider variant="middle" sx={{mt:"2rem"}}/>
            <Typography 
              sx={{mt: "2rem", mb:"2rem"}}
              color='#8A8A8A'
              variant="h4">
                Match Profile
            </Typography>
            <UserTypeButtons user={user}/>
            <InterestsSelect user={user}/>
            <InstrumentSelect user={user}/>
            <GoalsSelect user={user}/>
            <Button
                color="primary"
                variant="contained" 
                onClick={() => {closeModal()}}
            >
                Done
            </Button>
          </Stack>
        </Modal>
      : <></>}
    </div>
  )
};

export default RegistrationModal;