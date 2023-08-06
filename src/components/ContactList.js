import { useState, useEffect } from "react";
import {Table, TextField, TableBody, TableRow, TableCell, TableContainer} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import InvitationSuccessSnackbar from "./Snackbars/InvitationSuccessSnackbar";

export default function ContactList(props) {
    const {user, axiosInstance, closeModal} = props;
    const [matches, setMatches] = useState();
    const [openInvitationSnackbar, setOpenInvitationSnackbar] = useState(false)
    const handleCloseInvitationSnackbar = () => setOpenInvitationSnackbar(false);

    useEffect(() => {
        if(user){
            axiosInstance?.get(`/user_matches/${user?.id}`)
            .then(response => {
                setMatches(response?.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [user, axiosInstance])

    // user id is the band
    const inviteUserToBand = (user_to_invite) => {
        axiosInstance?.post(`/user_band/${user?.id}`, {
            params: {
                user_id: user_to_invite
            }
        }).then(
            closeModal(),
            setOpenInvitationSnackbar(true)
            
        )
        .catch(error => {
            console.log(error);
        });
    };

  return(
    <>
      <TableContainer component={Paper} style={{width: '100%', p:"1rem"}}>
        <Table>
            <TableBody>
                {matches?.map((u) => (
                    <TableRow
                        key={u.email}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            <TextField disabled variant="standard" defaultValue={`${u.first_name} ${u.last_name}`}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <IconButton aria-label="delete"
                              onClick={() => inviteUserToBand(u.id)}
                            >
                              <SendIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </TableContainer>
    <InvitationSuccessSnackbar
        component={"Band member"}
        open={openInvitationSnackbar}
        handleSnackbarClose={handleCloseInvitationSnackbar}
    />
    </>
  )}