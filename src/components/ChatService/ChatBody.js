import React from 'react';

const ChatBody = (props) => {
  const {messages, user, currentMatch} = props;

  return (
    <>
      <header className="chat__mainHeader">
        {currentMatch ? <p>Chatting with {currentMatch.first_name} {currentMatch.last_name}</p> : <p>Select a match to open chat!</p>}
      </header>

      <div className="message__container">
        {currentMatch && user && messages && messages.length > 0 &&
        messages.map((message) =>
        {
          if(message.sender_id === user.id && message.recipient_id === currentMatch.id) {
              return(
                <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </div>
              )
          }
          if (message.sender_id === currentMatch.id && message.recipient_id === user.id) {
            return (
              <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
            )
          }
          return null;
        })}
        <div ref={props.lastMessageRef} />

      </div>
    </>
  );
};

export default ChatBody;