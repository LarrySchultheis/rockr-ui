import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import placeholder from "../../images/placeholder.jpg";

export default function MatchProfileCard(props) {
    const {matchUser, axiosInstance} = props;
    const [matchProfile, setMatchProfile] = useState();
    const [userGoals, setUserGoals] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [userInstruments, setUserInstruments] = useState([]);

    useEffect(() => {
        if(matchUser){
            axiosInstance?.get(`/match_profiles/${matchUser.id}`)
                .then(response => {
                    setMatchProfile(response?.data);
                })
                .catch(error => {
                    console.log(error);
                });

            axiosInstance?.get(`/user_goals/${matchUser.id}`).then(response => {
                    setUserGoals(response?.data);
                })
                .catch(error => {
                    console.log(error);
                });

            axiosInstance?.get(`/user_musical_interests/${matchUser.id}`).then(response => {
                    setUserInterests(response?.data);
                }).catch(error => {
                    console.log(error);
                });

            axiosInstance?.get(`/user_instruments/${matchUser.id}`).then(response => {
                    setUserInstruments(response?.data);
                }).catch(error => {
                    console.log(error);
                });
        }
    }, [matchUser, axiosInstance])

    return (
        <Card
            sx={{
                ml:"auto",
                mr:"auto",
                mt: "2rem",
                mb: "2rem",
                display: "block",
                backgroundSize:"cover",
                width:"75%",
                height:"auto"
            }}
        >
            <CardContent sx={{ml:"2rem", mr:"2rem"}}>
                <CardMedia component="img" src={placeholder}/>
                <Typography sx={{mt:"2rem"}} gutterBottom variant="h2" component="div" color="text.primary">
                    {matchUser ? `${matchUser.first_name} ${matchUser.last_name}` : "text"}
                </Typography>
                <Typography gutterBottom variant="h4" component="div" color="secondary">
                    {matchUser?.is_band ? "Band" : "Individual User"}
                </Typography>
                <Divider variant="middle" />
                <Typography variant="h5" sx={{mt:"0.75rem", mb:"0.25rem"}} color="text.primary">Goals</Typography>
                <Stack direction="row" spacing={1} sx={{mb:"0.75rem"}}>
                    {userGoals?.map((g) => (
                        <Chip key={g.id} sx={{fontSize:"1rem"}} label={g.description} />
                    ))}
                </Stack>
                <Typography variant="h5" sx={{mb:"0.25rem"}} color="text.primary">Musical Interests</Typography>
                <Stack direction="row" spacing={1} sx={{mb:"0.75rem"}}>
                    {userInterests?.map((i) => (
                        <Chip key={i.id} sx={{fontSize:"1rem"}} label={i.description} />
                    ))}
                </Stack>
                <Typography variant="h5" sx={{mb:"0.25rem"}} color="text.primary">Instruments</Typography>
                <Stack direction="row" spacing={1} sx={{mb:"0.75rem"}}>
                    {userInstruments?.map((i) => (
                        <Chip key={i.id} sx={{fontSize:"1rem"}} label={i.description} />
                    ))}
                </Stack>
                <Typography variant="h5" sx={{mt:"1rem", mb:"0.25rem"}} color="text.primary">Bio</Typography>
                <Typography sx={{fontSize:"1.2rem"}} color="text.primary">
                    {matchProfile ? matchProfile?.bio : "Looks like this user hasn't filled out their bio yet!"}
                </Typography>
            </CardContent>
        </Card>
    );
}