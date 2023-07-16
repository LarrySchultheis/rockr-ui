import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

export default function ChatPage(props) {
  return (
    <div className="chat">
      <ChatBar user={props.user}/>
      <div className="chat__main">
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
};

