import { useState, useEffect } from "react";
import {Table, TextField, TableBody, TableRow, TableCell, TableContainer, Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DeleteSnackbar from "./Snackbars/DeleteSnackbar";
import BandInviteListModal from "./BandInviteListModal";

export default function BandManagementForm(props) {
  const {user, axiosInstance} = props;
  const [bandMembers, setBandMembers] = useState();
  const [refreshData, setRefreshData] = useState(false);

  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false)
  const handleCloseDeleteSnackbar = () => setOpenDeleteSnackbar(false);

  const [ openBandInviteListModal, setOpenBandInviteListModal] = useState(false);
  const handleCloseBandInviteListModal = () => setOpenBandInviteListModal(false);

  useEffect(() => {
    if(user){
      axiosInstance?.get(`/user_bands/${user?.id}`)
      .then(response => {
        setBandMembers(response?.data?.data);
        setRefreshData(false);
      })
      .catch(error => {
          console.log(error);
      });
    }
  }, [user, refreshData, axiosInstance])

  
  const deleteUserFromBand = (user_to_delete) => {
      axiosInstance?.delete(`/user_bands/${user?.id}`, {
          params: {
            user: user_to_delete
          }
        })
        .then(
          setRefreshData(true)
        )
        .catch(error => {
          console.log(error);
        });
  };

  return(
    <>
      <TableContainer style={{width: '100%'}}>
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
                              onClick={() => setOpenBandInviteListModal(true)}
                            >
                              Invite a user   
                              <AddIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
            </TableBody>
        </Table>
      </TableContainer>
      <BandInviteListModal
        user={user}
        open={openBandInviteListModal}
        handleClose={handleCloseBandInviteListModal}
        axiosInstance={axiosInstance}
      >
      </BandInviteListModal>
      <DeleteSnackbar
        component={"Band member"}
        open={openDeleteSnackbar}
        handleSnackbarClose={handleCloseDeleteSnackbar}
      />

    </>

  )}