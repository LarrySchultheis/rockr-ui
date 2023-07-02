import React, { useEffect, useState }from "react";
import {Box, Table, TableHead, TextField, TableBody, TableRow, TableCell, TableContainer, Checkbox, Button} from "@mui/material";
import Paper from '@mui/material/Paper';
import theme from "./Theme";
import CreateUserModal from "./CreateUserModal";

export default function AdminManagement() {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        getUsers();
      }, [setUsers])

      const getUsers = () => {
        fetch('http://localhost:5000/get_users')
        .then(response => response.json())
        .then(data => {
          data.data.map((d) => {
              return d.modified = false;
          })
          setUsers(data.data)
        });
      }

      const handleCheckboxToggle = (id, field) => {
        let u = users.find(u => u.id === id);
        u[field] = !u[field];
        u.modified = true;
        setUsers(users);
      }

      const handleInputChange = (e, id, field) => {
        console.log(e, id)
        let u = users.find(u => u.id === id);
        u[field] = e.target.value;
        u.modified = true;
        setUsers(users);
      }

      const handleSave = () => {
        let updatedUsers = users.filter((u => u.modified === true))
        console.log(updatedUsers)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(updatedUsers)
        };
        
        fetch('http://localhost:5000/update_user_account', requestOptions)
        .then(response => {
            if (response.status === 200) {
                alert("User settings successfully updated")
            }
            else {
                alert("Error updating user settings")
            }
        })
        }

    const deleteUser = (user_id, email) => {
        fetch(`http://localhost:5000/delete_user_account?id=${user_id}&email=${email}`)
        .then((response) => { 
            if(response.status === 200) {
                // Better than firing a reload IMO
                setUsers(users.filter((u) => { return u.id !== user_id }))
            }
            else {
                alert("Error deleting user")
            }
        })
    }

    const createUser = (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(user)
        }
        fetch('http://localhost:5000/create_user_account', requestOptions)
        .then((response) => {
            if (response.status === 200) {
                alert("User successfully created")
                getUsers()
            }
            else {
                alert("Error creating user")
            }
        })
        handleClose();
    }

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
                                        defaultChecked={u.is_active}
                                        onChange={() => handleCheckboxToggle(u.id, 'is_active')}
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
                                    onClick={() => deleteUser(u.id, u.email)}
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
                ></CreateUserModal>
            </TableContainer>

            </Paper>
        </div>

    )
}