import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useState, useEffect, useRef } from 'react';

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
  const lastMessageRef = useRef(null);

  const socket = props.socket;

  const compare = (a,b) => {
    if (a.ts < b.ts)
       return -1;
    if (a.ts > b.ts)
      return 1;
    return 0;
  }
    
  useEffect(() => {
    if (props.user) {
      axiosInstance.get(`/matches?email=${props.user.email}`).then(response => {
        let m = response?.data?.data;
        m = m.sort(compare)
        setMatches(m);
    });
    axiosInstance.get('/messages').then(response => {
      setMessages(response?.data?.data);
    });
    }
  }, [props.user])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setMessages([...messages, {message: data.data, recipient_id: data.recipient.id, sender_id: data.sender.id}]);
    })
  });

  const handleUserChange = ((match) => {
    setCurrentMatch(match);
  })

  return (
    <div className="chat">
      <ChatBar user={props.user} matches={matches} handleUserChange={handleUserChange}/>
      <div className="chat__main">
        <ChatBody messages={messages} user={props.dbUser} lastMessageRef={lastMessageRef} currentMatch={currentMatch}/>
        <ChatFooter socket={socket} currentMatch={currentMatch} user={props.dbUser}/>
      </div>
    </div>
  );
};

