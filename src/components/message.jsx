import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="img-wrapper">
        <img src={message.image} alt={message.name} />
      </div>
      <div className="message-details">
        <div className='align-center'>
          <h4>{message.name}</h4>
          <span>{message.time}</span>
        </div>
        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default Message;
