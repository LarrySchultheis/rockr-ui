import React from "react";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {postRegistration} from '../api/endpoints'

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

function RegistrationModal({
  open,
  handleModal
}) {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => {
    postRegistration(data);
    handleModal();
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form sx={{padding: 2}} onSubmit={handleSubmit(onSubmit)}>
            <input id="email" required={true} type="email" placeholder="Email Address" {...register("email")}/>
            <input id="password" required={true} type="password" placeholder="Password" />
            <Button color="secondary" variant="contained" type="submit">
              Create Account
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
};

export default RegistrationModal;