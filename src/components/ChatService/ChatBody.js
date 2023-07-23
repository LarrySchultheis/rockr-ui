import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = (props) => {
  const navigate = useNavigate();
  const {messages, user, currentMatch} = props;
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {currentMatch && 
        messages.map((message) =>
        {
          if(message.sender_id === user.id && message.recipient_id === currentMatch.user.id) {
                <div className="message__chats" key={message.id}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.message}</p>
                </div>
              </div>
          }
          if (message.sender_id === currentMatch.user.id && message.recipient_id === user.id) {
              <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.message}</p>
              </div>
            </div>
            
          }
        })}
      

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;