import {useState, useEffect} from 'react';
import {Table, TextField, TableBody, TableRow, TableCell, TableContainer} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
});

export default function BandInvitation({
    user,
    invitations,
    closeModal
  }) {
    const [bandInvitations, setBandInvitations] = useState(invitations);

    useEffect(() => {
        if(user){
            axiosInstance.get(`/user_band?user=${user.id}`)
            .then(response => {
                if(response.data){
                    setBandInvitations(response.data);
                }
            })
            .catch( 
                (e) => console.log( e )
            );
        }
    }, [user])

    const respondToInvitation = (invitation_response, band_id) => {
        axiosInstance.patch(`/user_band/${band_id}`, {
                params: {
                    user_id: user.id,
                    is_accepted: invitation_response,
                    seen: true
                }
            })
            .catch( 
                (e) => console.log( e )
            );
    }
  
    return (
        <>
        <TableContainer component={Paper} style={{width: '100%', p:"1rem"}}>
            <IconButton onClick={() => closeModal()}>
                <CloseIcon />
            </IconButton>
            <Table>
                <TableBody>
                  {bandInvitations?.map((i) => (
                      <TableRow
                          key={i.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <TableCell component="th" scope="row">
                              <TextField 
                                disabled variant="standard"
                                defaultValue={"band name"}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <IconButton onClick={() => respondToInvitation(true, i.band_id)}>
                                <CheckCircleOutlineIcon />
                            </IconButton>
                            <IconButton onClick={() => respondToInvitation(false, i.band_id)}>
                                <HighlightOffIcon />
                            </IconButton>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }