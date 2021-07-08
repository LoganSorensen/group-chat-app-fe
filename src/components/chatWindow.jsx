import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

// import { messages } from "../utils/data";
import Message from "./message";
import MessageInput from "./messageInput";

let socket;

const ChatWindow = ({ roomName }) => {
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  
  useEffect(() => {
    socket = io(ENDPOINT, connectionOptions);

    let username = "John";
    let room = roomName;

    socket.emit("joinRoom", { username, room });

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line
  }, [ENDPOINT]);
  
  useEffect(() => {
    const chatMessages = document.querySelector(".messages");
    socket.on("message", (message) => {
      setMessages(messages => [...messages, message])

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // socket.on("roomUsers")
  }, []);

  const sendMessage = (message) => {
    if (message) socket.emit("chatMessage", message);
  };

  return (
    <div className="chat-window">
      <div className="channel-name-tab top-tab">{roomName}</div>

      <div>

      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
          ))}
      </div>
      <MessageInput sendMessage={sendMessage} />
          </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  roomName: state.setChatState.currentRoom,
});

export default connect(mapStateToProps, {})(ChatWindow);
