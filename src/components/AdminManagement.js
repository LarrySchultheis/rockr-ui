import React, { useEffect, useState }from "react";
import {Box, Table, TableHead, TextField, TableBody, TableRow, TableCell, TableContainer, Checkbox, Button} from "@mui/material";
import Paper from '@mui/material/Paper';
import theme from "./Theme";




export default function AdminManagement() {
    // const [isAuthenticated, isLoading] = useAuth0();
    const [users, setUsers] = useState([])

    useEffect(() => {
        
          fetch('http://localhost:5000/get_users')
              .then(response => response.json())
              .then(data => {
                data.data.map((d) => {
                    return d.modified = false;
                })
                setUsers(data.data)
              });
        
      }, [setUsers])

      const handleCheckboxToggle = (id, field) => {
        let u = users.find(u => u.pkid === id);
        u[field] = !u[field];
        u.modified = true;
        setUsers(users);
      }

      const handleInputChange = (e, id, field) => {
        console.log(e, id)
        let u = users.find(u => u.pkid === id);
        u[field] = e.target.value;
        u.modified = true;
        setUsers(users);
      }

      const handleSave = () => {
        let updatedUsers = users.filter((u => u.modified === true))
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

    const deleteUser = (user_id) => {
        fetch(`http://localhost:5000/delete_user_account?user_id=${user_id}`)
        .then((res) => { 
            if(res.status === 200) {
                // Better than firing a reload IMO
                setUsers(users.filter((u) => { return u.pkid !== user_id }))
            }
            else {
                alert("Error deleting user")
            }
        })
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
                                    <TextField variant="standard" defaultValue={u.first_name} onChange={(e) => handleInputChange(e, u.pkid, "first_name")}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField variant="standard" defaultValue={u.last_name} onChange={(e) => handleInputChange(e, u.pkid, "last_name")}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <TextField variant="standard" defaultValue={u.username}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <TextField variant="standard" defaultValue={u.email} sx={{width:"250px"}}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <Checkbox
                                        color="primary"
                                        sx={{color: "black", '&.Mui-checked': {color: "primary"}}}
                                        defaultChecked={u.is_admin}
                                        onChange={() => handleCheckboxToggle(u.pkid, 'is_admin')}
                                    />
                                </TableCell>
                                <TableCell align="flex">
                                    <Checkbox
                                        sx={{color: "black", '&.Mui-checked': {color: "primary"}}}
                                        defaultChecked={u.is_active}
                                        onChange={() => handleCheckboxToggle(u.pkid, 'is_active')}
                                    />
                                </TableCell>
                                <TableCell align="flex">
                                <Checkbox
                                        sx={{color: "black", '&.Mui-checked': {color: "primary"}}}
                                        defaultChecked={u.is_band}
                                        onChange={() => handleCheckboxToggle(u.pkid, 'is_band')}
                                    />
                                </TableCell>
                                <TableCell align="flex">
                                <Button 
                                    sx={{backgroundColor: theme.palette.secondary.main}} 
                                    variant="contained" 
                                    onClick={() => deleteUser(u.pkid)}
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
                </Box>

            </TableContainer>

            </Paper>
        </div>

    )
}