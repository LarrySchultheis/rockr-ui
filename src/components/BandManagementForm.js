import { useState, useEffect } from "react";
import {Table, TextField, TableBody, TableRow, TableCell, TableContainer, Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import DeleteSnackbar from "./Snackbars/DeleteSnackbar";
import ContactListModal from "./ContactListModal";
import InvitationSuccessSnackbar from "./Snackbars/InvitationSuccessSnackbar";

export default function BandManagementForm(props) {
  const {user, axiosInstance} = props;
  const [bandMembers, setBandMembers] = useState();
  const [openInvitationSnackbar, setOpenInvitationSnackbar] = useState(false);
  const handleCloseInvitationSnackbar = () => setOpenInvitationSnackbar(false);

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const handleCloseDeleteSnackbar = () => setOpenDeleteSnackbar(false);

  const [ openContactListModal, setOpenContactListModal] = useState(false);
  const handleCloseContactListModal = () => {
    setOpenContactListModal(false);
    setOpenInvitationSnackbar(true);
  }

  useEffect(() => {
    if(user){
      axiosInstance?.get(`/user_band/${user?.id}`)
      .then(response => {
        setBandMembers(response?.data?.data);
      })
      .catch(error => {
          console.log(error);
      });
    }
  }, [user, axiosInstance])

  
  const deleteUserFromBand = (user_to_delete) => {
      axiosInstance?.delete(`/user_band/${user?.id}`, {
          params: {
            user: user_to_delete
          }
        })
        .then(setOpenDeleteSnackbar(true))
        .catch(error => {
          console.log(error);
        });
  };

  return(
    <>
      <TableContainer component={Paper} style={{width: '100%', p:"1rem"}}>
        <Table>
            <TableBody>
                {bandMembers?.map((u) => (
                    <TableRow
                        key={u.email}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <TextField disabled variant="standard" defaultValue={`${u.first_name} ${u.last_name}`}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <IconButton aria-label="delete"
                              onClick={() => deleteUserFromBand(u.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <Button aria-label="delete"
                              onClick={() => setOpenContactListModal(true)}
                            >
                              Invite a user   
                              <AddIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
            </TableBody>
        </Table>
      </TableContainer>
      <ContactListModal
        user={user}
        open={openContactListModal}
        handleClose={handleCloseContactListModal}
        axiosInstance={axiosInstance}
      >

      </ContactListModal>
      <InvitationSuccessSnackbar
        open={openInvitationSnackbar}
        handleSnackbarClose={handleCloseInvitationSnackbar}
      />
      <DeleteSnackbar
        component={"Band member"}
        open={openDeleteSnackbar}
        handleSnackbarClose={handleCloseDeleteSnackbar}
      />

    </>

  )}