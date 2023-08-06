import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Divider from '@mui/material/Divider';
import placeholder from "../../images/placeholder.jpg";

export default function MatchProfileCard(props) {
    const {user, matchUser, axiosInstance} = props;
    const [matchProfile, setMatchProfile] = useState();
    const [userGoals, setUserGoals] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [userInstruments, setUserInstruments] = useState([]);

    const respondToMatch = (matchResponse, matchUser) => {
        axiosInstance.patch(`/user_matches/${user.id}`, {
                params: {
                    match_id: matchUser.id,
                    accepted: matchResponse,
                    seen: true
                }
            })
            .catch( 
                (e) => console.log( e )
            );
    }

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
            }).catch(error => {
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
            key={matchUser?.email}
        >
        <CardMedia
            component="img"
            src={placeholder}
            sx={{
                ml:"auto",
                mr:"auto",
                mt: "2rem",
                mb: "2rem",
                display: "block",
                backgroundSize:"cover",
                width:"50%",
                height:"auto"
            }}
        />
        <CardContent sx={{ml:"2rem", mr:"2rem"}}>
            <Typography gutterBottom variant="h2" component="div" color="text.primary">
                {matchUser ? `${matchUser.first_name} ${matchUser.last_name}` : "text"}
            </Typography>
            <Typography gutterBottom variant="h4" component="div" color="secondary">
                {matchUser?.is_band ? "Band" : "Individual User"}
            </Typography>
            <Divider variant="middle" />
            <Typography variant="h5" sx={{mt:"0.75rem", mb:"0.25rem"}} color="text.primary">Goals</Typography>
            <Stack direction="row" spacing={1} sx={{mb:"0.75rem"}}>
                {userGoals?.map((g) => (
                    <Chip sx={{fontSize:"1rem"}} label={g.description} />
                ))}
            </Stack>
            <Typography variant="h5" sx={{mb:"0.25rem"}} color="text.primary">Musical Interests</Typography>
            <Stack direction="row" spacing={1} sx={{mb:"0.75rem"}}>
                {userInterests?.map((i) => (
                    <Chip sx={{fontSize:"1rem"}} label={i.description} />
                ))}
            </Stack>
            <Typography variant="h5" sx={{mb:"0.25rem"}} color="text.primary">Instruments</Typography>
            <Stack direction="row" spacing={1} sx={{mb:"0.75rem"}}>
                {userInstruments?.map((i) => (
                    <Chip sx={{fontSize:"1rem"}} label={i.description} />
                ))}
            </Stack>
            <Typography variant="h5" sx={{mt:"1rem", mb:"0.25rem"}} color="text.primary">Bio</Typography>
            <Typography sx={{fontSize:"1.2rem"}} color="text.primary">
                {matchProfile ? matchProfile?.bio : "Looks like this user hasn't filled out their bio yet!"}
            </Typography>
        </CardContent>
        <CardActions sx={{ml:"2rem", mr:"2rem"}}>
            <IconButton>
                <CheckCircleOutlineIcon 
                    style={{ fontSize: '5rem' }} 
                    color="success"
                    onClick={() => respondToMatch(true, matchUser)}
                />
            </IconButton>
            <IconButton>
                <HighlightOffIcon 
                    style={{ fontSize: '5rem' }}
                    color="error"
                    onClick={() => respondToMatch(false, matchUser)}
                />
            </IconButton>
        </CardActions>
      </Card>
    );
}