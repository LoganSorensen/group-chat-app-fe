import React from "react";

import { messages } from "../utils/data";
import Message from "./message";
import MessageInput from "./messageInput";

const ChatWindow = () => {
  return (
    <div className="chat-window">
      <div className="channel-name-tab top-tab">Front-End Developers</div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
