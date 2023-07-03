import React from "react";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {postRegistration} from '../api/endpoints'
import PersonalDetailsForm from '../UserProfile/PersonalDetailsForm'
import RequiredFieldsForm from './RequiredFieldsForm'
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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


function LoginModal({
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
        <Stack alignItems="center" sx={style}>
          <RequiredFieldsForm/>
          <Button 
            color="secondary"
            variant="contained"
            type="submit"
            sx={{minWidth:"8rem", minHeight:"3rem", mt:"1rem", mb:"1rem"}}
            onSubmit={{handleSubmit}}
          >
            Create Account
          </Button>
          <p>Don't have an account?</p>
          <Link href="#">
            <Typography color="
              #1d17d1">Sign up.
            </Typography>
          </Link>
        </Stack>
      </Modal>
    </div>
  )
};

export default LoginModal;