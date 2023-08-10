import React, { useEffect, useState }from "react";
import {Typography, Table, TableHead, TextField, TableBody, TableRow, TableCell, TableContainer, Checkbox, Button, IconButton} from "@mui/material";
import theme from "../Theme";
import CreateUserModal from "./CreateUserModal";
import DeleteIcon from '@mui/icons-material/Delete';
import SuccessSnackbar from "../SuccessSnackbar";
import DeleteSnackbar from "../DeleteSnackbar";
import AddIcon from '@mui/icons-material/Add';
import TablePagination from "@mui/material/TablePagination";

export default function AdminManagement(props) {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const axiosInstance = props.axiosInstance;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [refreshData, setRefreshData] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
    const handleCloseDeleteSnackbar = () => setOpenDeleteSnackbar(false);

    const [pg, setpg] = React.useState(0);
    const [rpg, setrpg] = React.useState(5);
    function handleChangePage(event, newpage) {
        setpg(newpage);
    }
  
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setpg(0);
    }

    useEffect(() => {
        axiosInstance.get('/users')
        .then(response => {
            setUsers(response?.data);
            setRefreshData(false);
        })
    }, [refreshData, axiosInstance])

    const handleCheckboxToggle = (id, field) => {
        let u = users.find(u => u.id === id);
        u[field] = !u[field];
        patchUser(field, u);
    }

    const handleInputChange = (e, id, field, patch) => {
        let u = users.find(u => u.id === id);
        u[field] = e.target.value;
        if(patch){
            patchUser(field, u);
        }
    }

    const deleteUser = (user_id) => axiosInstance.delete(`/users/${user_id}`)
        .then(
            setUsers(users.filter(item => item.id !== user_id)),
            setOpenDeleteSnackbar(true),
        )
        .catch(function(error) {
            console.log(error);
            alert("Error deleting user");
        });

    const createUser = (user) => 
        axiosInstance.post(`/users/`, {user})
            .then(
                setRefreshData(true),
                setOpenSnackbar(true)
            )
            .catch(function(error) {
                console.log(error);
                alert("Error creating user");
            })
            .finally(handleClose());

    const patchUser = (field, user)  => 
        axiosInstance.patch(`/users/${user.id}`, {
                params:{
                    [field]: user[field]
                }
            })
            .then(
                setOpenSnackbar(true),
                setRefreshData(true)
            )
            .catch(function(error) {
                console.log(error);
                alert("Error creating user");
            })
            .finally(handleClose());

    return (
        <div>
            <Typography variant="h2" color="text.primary" sx={{pl: 10, pt:10}}>
                Admin Management
            </Typography>
            <Button 
                sx={{mt:5, mb:5, ml:10, backgroundColor: theme.palette.secondary.main}} 
                variant="contained" 
                endIcon={<AddIcon/>}
                size="large"
                onClick={() => handleOpen()}
            >
                Create User
            </Button>    
            <CreateUserModal
                open={open}
                handleClose={handleClose}
                handleSubmit={createUser}
                users={users}
            />
            <TableContainer sx={{pl: 10, pr: 10}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: theme.palette.primary.main}}>
                            <TableCell sx={{color: "text.secondary"}}>First Name</TableCell>
                            <TableCell sx={{color: "text.secondary"}}>Last Name</TableCell>
                            <TableCell sx={{color: "text.secondary"}} align="flex">Username</TableCell>
                            <TableCell sx={{color: "text.secondary"}} align="flex">Email</TableCell>
                            <TableCell sx={{color: "text.secondary"}} align="flex">Is Admin</TableCell>
                            <TableCell sx={{color: "text.secondary"}} align="flex">Is Paused</TableCell>
                            <TableCell sx={{color: "text.secondary"}} align="flex">Is Band</TableCell>
                            <TableCell sx={{color: "text.secondary"}} align="flex">Danger Zone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.slice(pg * rpg, pg * rpg + rpg).map((u) =>  (
                        // {users?.map((u) => (
                            <TableRow
                                key={u.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <TextField variant="standard" defaultValue={u.first_name} onChange={(e) => handleInputChange(e, u.id, "first_name")} onBlur={(e) => handleInputChange(e, u.id, "first_name", true)}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField variant="standard" defaultValue={u.last_name} onChange={(e) => handleInputChange(e, u.id, "last_name")} onBlur={(e) => handleInputChange(e, u.id, "last_name", true)}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <TextField variant="standard" defaultValue={u.username} onChange={(e) => handleInputChange(e, u.id, "username")} onBlur={(e) => handleInputChange(e, u.id, "username", true)}/>
                                </TableCell>
                                <TableCell align="flex">
                                    <TextField variant="standard" defaultValue={u.email} sx={{width:"250px"}} onChange={(e) => handleInputChange(e, u.id, "email")} onBlur={(e) => handleInputChange(e, u.id, "email", true)}/>
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
                                <TableCell align="flex" component="th" scope="row">
                                    <IconButton aria-label="delete"
                                        variant="contained" 
                                        onClick={() => deleteUser(u.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rpg}
                page={pg}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{mr:10}}
            />
            <SuccessSnackbar
                message={"Save Successful!"}
                open={openSnackbar}
                handleSnackbarClose={handleCloseSnackbar}
            />
            <DeleteSnackbar
                component={"User"}
                open={openDeleteSnackbar}
                handleSnackbarClose={handleCloseDeleteSnackbar}
            />
        </div>

    )
}