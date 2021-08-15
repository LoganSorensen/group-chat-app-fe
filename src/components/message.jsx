import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <div className="img-wrapper">
        <img src={message?.profileImg} alt={message?.name} />
      </div>
      <div className="message-details">
        <div className="align-center">
          <h4>{message?.user}</h4>
          <span>{message?.timestamp}</span>
        </div>
        <p>{message?.text}</p>
      </div>
    </div>
  );
};

export default Message;
