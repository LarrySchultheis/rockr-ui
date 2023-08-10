import {useEffect, useState} from 'react';
import MatchProfileCard from '../components/MatchProfile/MatchProfileCard';
import { Grid, Typography, Stepper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import placeholder from "../images/placeholder.jpg";

export default function MatchPage(props) {
  const {user, axiosInstance} = props;
  const [matches, setMatches] = useState([]);
  const [matchUser, setMatchUser] = useState(false)
  const [activeStep, setActiveStep] = useState(0);
  const [maxSteps, setMaxSteps] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setMatchUser(matches[activeStep]);
  };

  useEffect(() => {
    setMaxSteps(matches.length);
    setMatchUser(matches[activeStep]);
  }, [matches, activeStep])

  useEffect(() => {
    if(user){
      axiosInstance?.get(`/user_matches/${user?.id}`)
      .then(response => {
          setMatches(response?.data);
          setIsLoading(false);
      })
      .catch(error => {
          console.log(error);
      });
    }
  }, [user, axiosInstance])

  const respondToMatch = (matchResponse) => {
    handleNext();
    axiosInstance.patch(`/user_matches/${user?.id}`, {
      params: {
          match_id: matchUser?.id,
          accepted: matchResponse,
          seen: true
      }
    })
    .catch( 
        (e) => console.log( e )
    );
  }

  return (
    <>
    { isLoading ?
      <Grid sx={{mt:"5rem"}} container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <Typography sx={{mt:"2rem", mb:"2rem"}} gutterBottom variant="h2" component="div" color="text.primary">
              Connecting you with other Rockrs...
            </Typography>
            <LinearProgress color="secondary" />
          </Grid> 
      </Grid>
      :
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid container item xs={1} direction="column"/>
        <Grid container item xs={1} direction="column">
            <IconButton>
                <CheckCircleOutlineIcon 
                    style={{ fontSize: '5rem' }} 
                    color="success"
                    onClick={() => respondToMatch(true)}
                />
            </IconButton>
        </Grid>
        <Grid container item xs={8} direction="column">
            <Stepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
            />
            {
              matchUser && activeStep < maxSteps ?
              <div key={matchUser?.email}>
                <MatchProfileCard
                  matchUser={matchUser}
                  axiosInstance={axiosInstance}
                />
              </div>
            : 
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
                      Looks like you've gone through all of your matches! Check back soon.
                  </Typography>    
                  </CardContent>
              </Card>
            }
            
      </Grid>
      <Grid container item xs={1} direction="column">
            <IconButton>
                <HighlightOffIcon 
                    style={{ fontSize: '5rem' }}
                    color="error"
                    onClick={() => respondToMatch(false)}
                />
            </IconButton>
        </Grid>
        <Grid container item xs={1} direction="column"/>
      </Grid>
    }
    </>
  );
};
