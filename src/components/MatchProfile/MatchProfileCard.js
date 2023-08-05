// import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import morecowbell from "../../images/morecowbell.jpg";

// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: {
//       "Content-Type": "application/json"
//     }
// });

export default function MatchProfileCard({
    user,
}) {

    return (
        <Card>
        <CardMedia
          component="img"
          sx={{m:"2rem"}}
          src={morecowbell}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name
          </Typography>
          <Typography variant="body2" color="text.primary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
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