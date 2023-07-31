import { Button, ButtonGroup } from '@mui/material';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
});

export default function BandManagementForm({
    user,
}) {

    const handleBandAccept = (band_id) => {
        axiosInstance.patch(`/users/${user?.id}`, {
          params: {
            band_id: band_id,
            is_verified: true
          }
        })
        .catch(error => {
          console.log(error);
        });
      };
    
    // user id is the band
    const addUserBandFunc = (user_to_add) => {
        axiosInstance.post(`/user_band/${user?.id}`, {
            params: {
                user_to_add: user_to_add
            }
          })
          .catch(error => {
            console.log(error);
          });
    };
    
    const removeUserBandFunc = (user_to_add) => {
        axiosInstance.delete(`/user_band/${user?.id}`, {
            params: {
                user_to_add: user_to_add
            }
          })
          .catch(error => {
            console.log(error);
          });
    };

    return(
        <ButtonGroup style={{ margin: "auto" }} variant="contained">
            <Button onClick={() => {
                addUserBandFunc(user?.id);
            }}>Add To Band</Button>
            <Button onClick={() => {
                handleBandAccept(user?.id);
            }}>Accept Band Request</Button>
            <Button onClick={() => {
                removeUserBandFunc(user?.id);
            }}>Remove From Band</Button>
        </ButtonGroup>

)}