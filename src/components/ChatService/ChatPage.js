import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { useState, useEffect, useRef } from 'react';

export default function ChatPage(props) {
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const {socket, axiosInstance} = props;
    
  useEffect(() => {
    if (props.user) {
      axiosInstance?.get(`/matches?email=${props.user.email}`)
      .then(response => {
        setMatches(response?.data?.data);
      })
      .catch(error => {
        console.log(error);
    });

    }
  }, [axiosInstance, props.user])

  useEffect(() => {
    if (matches.length > 0) {
      setCurrentMatch(matches[0]);
    }
  }, [matches, setCurrentMatch])

  useEffect(() => {
    axiosInstance?.get('/messages').then(response => {
      setMessages(response?.data?.data);
    });
  }, [axiosInstance]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setMessages([...messages, {message: data.data, recipient_id: data.recipient.id, sender_id: data.sender.id}]);
    })
  }, [messages, socket]);

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

