import React, { useState } from "react";

const MessageInput = ({sendMessage}) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    sendMessage(message);
  };

  return (
    <div className="message-input">
      <form className="align-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          placeholder={`Message Front-End Developers`}
          onChange={handleChange}
        />
        <button className="flex-center">
          <span className="material-icons">send</span>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
