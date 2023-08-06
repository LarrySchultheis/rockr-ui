import {useEffect, useState} from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import MatchProfileCard from '../components/MatchProfile/MatchProfileCard';

export default function MatchPage(props) {
  const {user, axiosInstance} = props;
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
  }, [user, axiosInstance])

  return (
      <Slide autoplay={false}>
        {matches?.map((u) => (
          <div className="each-slide-effect">
            <MatchProfileCard user={user} matchUser={u} axiosInstance={axiosInstance}/>
          </div>
        ))}
      </Slide>
  );
};
