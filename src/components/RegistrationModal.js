import React from "react";
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// import { useNavigate } from "react-router-dom";
// let navigate = useNavigate();
// const routeChange = () =>{ 
//   let path = `register`; 
//   navigate(path);
// }
{/* <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href=""
        sx={{ minWidth: 200 }}
        onClick={routeChange} //</ProductHeroLayout>loginWithRedirect({authorizationParams: {screen_hint: "signup",}}}
      ></Button> */}

function RegistrationModal({
  open,
  modalHandler
}) {

  return (
    <div>
      <Modal
        open={open}
        onClose={modalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormGroup sx={{padding: 2}}>
            <Input id="reg-email" placeholder="Email Address" />
            <Input id="reg-password" type="password" placeholder="Password" />
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              // onClick={() => loginWithRedirect()}
            >
            Create Account
            </Button>
          </FormGroup>
        </Box>
      </Modal>
    </div>
  )
};
  // return (

// )};

export default RegistrationModal;