import {useEffect, useState} from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import MatchProfileCard from '../components/MatchProfile/MatchProfileCard';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
});

export default function MatchPage({
  user
}) {
    const [matches, setMatches] = useState([]);

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
  }, [user])

    return (
        <Slide>
          {matches?.map((u) => (
            <div className="each-slide-effect">
              <MatchProfileCard match_user={u}/>
            </div>
          ))}
        </Slide>
    );
};
