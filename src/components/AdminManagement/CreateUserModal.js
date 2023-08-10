import * as React from 'react';
import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Typography, TextField, Switch, FormGroup, FormControlLabel, Button, Grid} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import theme from "../Theme";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth:"35%",
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

export default function CreateUserModal(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isBand, setIsBand] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [usernames, setUsernames] = useState([]);
    const formRef = React.useRef();
    const {handleClose} = props;

    useEffect(() => {
      let usrnames = [];
      props.users.forEach((u) => {
        usrnames.push(u.username);
      })
      setUsernames(usrnames);
    }, [props.users])


    const handleInputChange = (e, field) => {
        if(field === 'firstName') setFirstName(e.target.value);
        if(field === 'lastName') setLastName(e.target.value);
        if(field === 'email') setEmail(e.target.value);
        if(field === 'username') setUsername(e.target.value);
        if(field === 'isBand') setIsBand(e.target.checked);
        if(field === 'isAdmin') setIsAdmin(e.target.checked);
    }

      const validateUsername = () => {
        setUsername(username === "" ? null : username);
        if (username !== null && usernames.includes(username)) {
          alert("Sorry, this username is already in our system!")
          return false
        }
        return true
      }
 
    const validateForm = () => {
      if (formRef.current.reportValidity() && validateUsername()) {
        props.handleSubmit({
          first_name: firstName,
          last_name: lastName,
          email: email,
          username: username === "" ? null : username,
          is_band: isBand,
          is_paused: false,
          is_admin: isAdmin,
          is_active: true
        })
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
        <Grid container spacing={2} sx={{p:"2rem"}}>
            <Grid container item xs={11} direction="column">
              <Typography variant="h6" color="text.primary">
                  Enter the user's information.
              </Typography>
            </Grid>
            <Grid container item xs={1} direction="column" >
            <IconButton onClick={() => handleClose()}>
                <CloseIcon />
            </IconButton>
            </Grid>
        </Grid>
          <form ref={formRef}>
          <FormGroup sx={{display:"flex", alignContent:"center"}}>
                <TextField required InputLabelProps={{ shrink: true }} label="Required" variant="standard" focused={true} sx={{p: 2}}  onChange={(e) => handleInputChange(e, "firstName")} placeholder="First Name" />
                <TextField required InputLabelProps={{ shrink: true }} label="Required" variant="standard" focused={true} sx={{p: 2}} onChange={(e) => handleInputChange(e, "lastName")} placeholder="Last Name"/>
                <TextField required InputLabelProps={{ shrink: true }} label="Required" variant="standard" focused={true} type="email" sx={{p: 2}} onChange={(e) => handleInputChange(e, "email")} placeholder="Email"/>
                <TextField InputLabelProps={{ shrink: true }} variant="standard" sx={{p: 2}} onChange={(e) => handleInputChange(e, "username")} placeholder="Username"/>
                <FormControlLabel control={<Switch />} onChange={(e) => handleInputChange(e, "isBand")}label="Registering as a band?"/>
                <FormControlLabel control={<Switch />} onChange={(e) => handleInputChange(e, "isAdmin")}label="Admin?"/>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Button 
                        sx={{mt:3, mb:5, backgroundColor: theme.palette.secondary.main}} 
                        variant="contained" 
                        onClick={() => validateForm()}
                    >
                        Submit
                    </Button>
                </Box>
            </FormGroup>  
          </form>
        </Box>
      </Modal>
    </div>
  );
}