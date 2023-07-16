import React, { useEffect, useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json"
    }
  });

const ChatBar = (props) => {

    const [matches, setMatches] = useState([]);
    useEffect(() => {
        if (props.user) {
            console.log(props.user)
            axiosInstance.get(`/matches?email=${props.user.email}`).then(response => {
                setMatches(response?.data?.data);
            });
        }
    }, [props.user])
    console.log(matches)
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">Matches</h4>
        <div className="chat__users">
            {matches.map(m => {
                return <div>{m.user.first_name} {m.user.last_name}</div>;
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;