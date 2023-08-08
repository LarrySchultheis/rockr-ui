import {useState, useEffect} from 'react';
import {Table, TableBody, TableRow, TableCell, TableContainer} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';
import theme from "../Theme";

export default function BandInvitation(props) {
    const {user, invitations, closeModal, axiosInstance} = props;
    const [bandInvitations, setBandInvitations] = useState(invitations);
    const [bandUsers, setBandUsers] = useState({});
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        if(user){
            axiosInstance?.get(`/user_bands?user=${user.id}`)
            .then(response => {
                if(response.data){
                    setBandInvitations(response.data);
                    setRefreshData(false);
                }
            })
            .catch( 
                (e) => console.log( e )
            );
        }
    }, [user, refreshData, axiosInstance])

    useEffect(() => {
        axiosInstance?.get("/bands")
            .then(response => {
                setBandUsers(response.data);
            })
            .catch( 
                (e) => console.log( e )
            );
    }, [axiosInstance])


    const respondToInvitation = (invitationResponse, bandId) => {
        axiosInstance.patch(`/user_bands/${bandId}`, {
                params: {
                    user_id: user.id,
                    is_accepted: invitationResponse,
                    seen: true
                }
            }).then(
                setRefreshData(true)
            )
            .catch( 
                (e) => console.log( e )
            );
    }
  
    return (
        <>
            <TableContainer style={{width: '100%'}}>
                <Typography variant="h6" color="text.primary">
                    Please accept or decline your band initations!
                    <IconButton onClick={() => closeModal()}>
                        <CloseIcon />
                    </IconButton>
                </Typography>
                <Table>
                    <TableBody>
                        {bandInvitations?.map((i) => (
                            i.seen ? 
                                <></> :
                                <TableRow
                                    key={i.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell 
                                            component="th"
                                            scope="row"
                                            sx={{color: theme.palette.text.primary}}
                                        >
                                            {bandUsers[i.band_id]?.username}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                display: "flex",
                                                justifyContent:"right",
                                            }}
                                        >
                                            <IconButton onClick={() => respondToInvitation(true, i.band_id)}>
                                                <CheckCircleOutlineIcon color="success"/>
                                            </IconButton>
                                            <IconButton onClick={() => respondToInvitation(false, i.band_id)}>
                                                <HighlightOffIcon color="error"/>
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