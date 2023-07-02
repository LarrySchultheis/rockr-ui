import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {TextField, Switch, FormGroup, FormControlLabel, Button} from '@mui/material'
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isBand, setIsBand] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("");

    const handleInputChange = (e, field) => {
        if(field === 'firstName') setFirstName(e.target.value);
        if(field === 'lastName') setLastName(e.target.value);
        if(field === 'email') setEmail(e.target.value);
        if(field === 'username') setUsername(e.target.value);
        if(field === 'isBand') setIsBand(e.target.checked);
        if(field === 'isAdmin') setIsAdmin(e.target.checked);
        if(field === 'password') setPassword(e.target.value);
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
                <TextField InputLabelProps={{ shrink: true }} required={true} variant="standard" sx={{p: 2}}  onChange={(e) => handleInputChange(e, "firstName")} placeholder="First Name"/>
                <TextField InputLabelProps={{ shrink: true }} required={true} variant="standard" sx={{p: 2}} onChange={(e) => handleInputChange(e, "lastName")} placeholder="Last Name"/>
                <TextField InputLabelProps={{ shrink: true }} required={true} variant="standard" sx={{p: 2}} onChange={(e) => handleInputChange(e, "email")} placeholder="Email"/>
                <TextField InputLabelProps={{ shrink: true }} required={true} variant="standard" type="password" sx={{p: 2}} onChange={(e) => handleInputChange(e, "password")} placeholder="Password"/>
                <TextField InputLabelProps={{ shrink: true }} variant="standard" sx={{p: 2}} onChange={(e) => handleInputChange(e, "username")} placeholder="Username"/>
                <FormControlLabel required control={<Switch />} onChange={(e) => handleInputChange(e, "isBand")}label="Registering as a band?"/>
                <FormControlLabel required control={<Switch />} onChange={(e) => handleInputChange(e, "isAdmin")}label="Admin?"/>
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
                        onClick={() => {props.handleSubmit({
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            username: username,
                            password: password,
                            is_band: isBand,
                            is_active: true,
                            is_admin: isAdmin,
                        })}}
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