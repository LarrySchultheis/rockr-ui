import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import morecowbell from "../../images/morecowbell.jpg";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
});

export default function MatchProfileCard({
    matchUser,
}) {

    // useEffect(() => {
    //     if(matchUser){
    //       axiosInstance.get(`/user_matches/${user?.id}`)
    //       .then(response => {
    //           setMatches(response?.data);
    //       })
    //       .catch(error => {
    //           console.log(error);
    //       });
    //     }
    // }, [matchUser])

    return (
        <Card
            key={matchUser?.email}
        >
        <CardMedia
            component="img"
            src={morecowbell}
            sx={{
                ml:"auto",
                mr:"auto",
                mt: "2rem",
                mb: "2rem",
                display: "block",
                backgroundSize:"cover",
                width:"60%",
                height:"auto"
            }}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="text.primary">
                {matchUser ? `${matchUser.first_name} ${matchUser.last_name}` : ""}
            </Typography>
            {/* <Typography variant="body2" color="text.primary">
                {match_user? match_user?.bio : ""}
            </Typography> */}
        </CardContent>
        <CardActions>
            <IconButton>
                <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton>
                <HighlightOffIcon />
            </IconButton>
        </CardActions>
      </Card>
    );
}