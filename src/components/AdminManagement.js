import React, { useEffect, useState }from "react";
import {Box, Table, TableHead, TextField, TableBody, TableRow, TableCell, TableContainer, Checkbox, Button} from "@mui/material";
import Paper from '@mui/material/Paper';
import theme from "./Theme";
import CreateUserModal from "./CreateUserModal";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://18.220.27.37:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default function AdminManagement() {
    const [users, setUsers] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        getUsers();
      }, [setUsers])

    const getUsers = () => {
    fetch('http://18.220.27.37:5000/users')
        .then(response => response.json())
        .then(data => {
            let usrNames = [];
            data.map((d) => {
                usrNames.push(d.username);
                return d.modified = false;
            })
            setUsers(data);
            setUsernames(usrNames);
        });
    }

    const handleCheckboxToggle = (id, field) => {
        let u = users.find(u => u.id === id);
        u[field] = !u[field];
        u.modified = true;
        setUsers(users);
    }

    const handleInputChange = (e, id, field) => {
        let u = users.find(u => u.id === id);
        u[field] = e.target.value;
        u.modified = true;
        setUsers(users);
    }

    const handleSave = () => {
        let updatedUsers = users.filter((u => u.modified === true))
        
        axiosInstance.post(`/users`, JSON.stringify(updatedUsers))
            .then(
                alert("User settings successfully updated")
            )
            .catch(function(error) {
                console.log(error);
                alert("Error updating user settings");
            });
    }

    const deleteUser = (user_id) => axiosInstance.delete(`/users/${user_id}`)
        .then(
            setUsers(users.filter((u) => { return u.id !== user_id }))
        )
        .catch(function(error) {
            console.log(error);
            alert("Error deleting user");
        });

    const createUser = (user)  => axiosInstance.post(`/users`, {user})
        .then(
            alert("User successfully created"),
            getUsers(),
        )
        .catch(function(error) {
            console.log(error);
            alert("Error creating user");
        })
        .finally(handleClose());

    return (
        <div>
            <Paper sx={{pt: 10, pb: 50, pl: 10, pr: 10}}>
            <h1>Admin Management</h1>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: theme.palette.primary.main}}>
                            <TableCell sx={{color: theme.palette.text.secondary}}>First Name</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}}>Last Name</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}} align="flex">Username</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}} align="flex">Email</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}} align="flex">Is Admin</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}} align="flex">Is Active</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}} align="flex">Is Band</TableCell>
                            <TableCell sx={{color: theme.palette.text.secondary}} align="flex">Danger Zone</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow
                                key={u.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <TextField variant="standard" defaultValue={u.first_name} onChange={(e) => handleInputChange(e, u.id, "first_name")}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField variant="standard" defaultValue={u.last_name} onChange={(e) => handleInputChange(e, u.id, "last_name")}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <TextField variant="standard" defaultValue={u.username} onChange={(e) => handleInputChange(e, u.id, "username")}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <TextField variant="standard" defaultValue={u.email} sx={{width:"250px"}} onChange={(e) => handleInputChange(e, u.id, "email")}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <Checkbox
                                        color="primary"
                                        sx={{color: "black", '&.Mui-checked': {color: "primary"}}}
                                        defaultChecked={u.is_admin}
                                        onChange={() => handleCheckboxToggle(u.id, 'is_admin')}
                                    />
                                </TableCell>
                                <TableCell align="flex">
                                    <Checkbox
                                        sx={{color: "black", '&.Mui-checked': {color: "primary"}}}
                                        defaultChecked={u.is_paused}
                                        onChange={() => handleCheckboxToggle(u.id, 'is_paused')}
                                    />
                                </TableCell>
                                <TableCell align="flex">
                                <Checkbox
                                        sx={{color: "black", '&.Mui-checked': {color: "primary"}}}
                                        defaultChecked={u.is_band}
                                        onChange={() => handleCheckboxToggle(u.id, 'is_band')}
                                    />
                                </TableCell>
                                <TableCell align="flex">
                                <Button 
                                    sx={{backgroundColor: theme.palette.secondary.main}} 
                                    variant="contained" 
                                    onClick={() => deleteUser(u.id)}
                                >
                                    Delete
                                </Button>          
                                </TableCell>
                            </TableRow>
                        )) 
}
                            
    
                    </TableBody>
                </Table>
                <Box sx={{display: "flex", flexDirection: "row-reverse"}}>
                    <Button 
                        sx={{m:5, backgroundColor: theme.palette.secondary.main}} 
                        variant="contained" 
                        size="large"
                        onClick={() => handleSave()}
                    >
                        Save
                    </Button> 
                    <Button 
                        sx={{m:5, backgroundColor: theme.palette.secondary.main}} 
                        variant="contained" 
                        size="large"
                        onClick={() => handleOpen()}
                    >
                        Create User
                    </Button>                                           
                </Box>
                <CreateUserModal
                    open={open}
                    handleClose={handleClose}
                    handleSubmit={createUser}
                    usernames={usernames}
                ></CreateUserModal>
            </TableContainer>

            </Paper>
        </div>

    )
}