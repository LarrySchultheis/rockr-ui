import { useState, useEffect } from "react";
import {Table, TextField, TableBody, TableRow, TableCell, TableContainer} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

export default function ContactList(props) {
    const {user, axiosInstance, closeModal} = props;
    const [potentialBandMembers, setPotentialBandMembers] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        if(user){
            axiosInstance?.get(`/user_bands/${user.id}?filter=${true}`)
            .then(response => {
                setPotentialBandMembers(response?.data);
                setRefreshData(false);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [user, refreshData, axiosInstance])

    // user id is the band
    const inviteUserToBand = (user_to_invite) => {
        axiosInstance?.post(`/user_bands/${user?.id}`, {
            params: {
                user_id: user_to_invite
            }
        })
        .then(setRefreshData(true))
        .catch(error => {
            console.log(error);
        });
    };

  return(
    <>
      <TableContainer style={{width: '100%'}}>
        <Typography variant="h6" color="text.primary">
            Invite any of the following users to your band:
            <IconButton onClick={() => closeModal()}>
                <CloseIcon />
            </IconButton>
        </Typography>
        <Table>
            <TableBody>
                {potentialBandMembers?.map((u) => (
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
    </>
  )}