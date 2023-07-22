import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useState, useEffect } from 'react';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

export default function ChatPage(props) {
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [messages, setMessages] = useState([]);

  const socket = props.socket;
  useEffect(() => {
      if (props.user) {
          console.log(props.user)
          axiosInstance.get(`/matches?email=${props.user.email}`).then(response => {
              setMatches(response?.data?.data);
          });
      }
  }, [props.user])

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  console.log(matches)
  console.log(currentMatch)

  return (
    <div className="chat">
      <ChatBar user={props.user} matches={matches} setCurrentMatch={setCurrentMatch}/>
      <div className="chat__main">
        <ChatBody messages={messages}/>
        <ChatFooter socket={socket} currentMatch={currentMatch} user={props.user}/>
      </div>
    </div>
  );
};

