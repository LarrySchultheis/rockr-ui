import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {TextField, FormGroup, Button} from '@mui/material'
import theme from "./Theme";

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

export default function CreateUserModal(props) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleInputChange = (e, field) => {
        if(field === 'newPassword') setNewPassword(e.target.value);
        if(field === 'confirmPassword') setConfirmPassword(e.target.value);
    }

    const validatePassword = (newPassword, confirmPassword) => {
        let errs = [];
        if (newPassword !== confirmPassword) alert("Password do not match");
        else {
            if (newPassword.length < 8) errs.push("\nPassword must be at least 8 characters");
            if (!/[A-Z]/.test(newPassword)) errs.push("\nPassword must contain at least one uppercase letter");
            if (!/\d/.test(newPassword)) errs.push("\nPassword must contain at least one number");
            if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword)) errs.push("\nPassword must contain at least one special character");
            if (errs.length > 0) alert(errs);
            else props.handleSubmit(newPassword)
        }
   }

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <FormGroup>
                <TextField InputLabelProps={{ shrink: true }} type="password" required={true} variant="standard" sx={{p: 2}}  onChange={(e) => handleInputChange(e, "newPassword")} placeholder="New Password"/>
                <TextField InputLabelProps={{ shrink: true }} type="password" required={true} variant="standard" sx={{p: 2}} onChange={(e) => handleInputChange(e, "confirmPassword")} placeholder="Confirm Password"/>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Button 
                        sx={{m:1, backgroundColor: theme.palette.secondary.main}} 
                        variant="contained" 
                        onClick={() => {props.handleClose()}}
                    >
                        Close
                    </Button>
                    <Button 
                        sx={{m:1, backgroundColor: theme.palette.secondary.main}} 
                        variant="contained" 
                        onClick={() => {validatePassword(newPassword, confirmPassword)}}
                    >
                        Submit
                    </Button>
                </Box>
            </FormGroup>        
        </Box>
      </Modal>
    </div>
  );
}