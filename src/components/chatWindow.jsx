import React, { useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import { messages } from "../utils/data";
import Message from "./message";
import MessageInput from "./messageInput";

let socket;

const ChatWindow = ({ roomName }) => {
  const ENDPOINT = "localhost:5000";

  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  console.log({ roomName });

  useEffect(() => {
    socket = io(ENDPOINT, connectionOptions);

    let username = "John";
    let room = "Test Room";

    socket.emit("joinRoom", { username, room });

    return () => {
      //   socket.emit("disconnect");
      socket.disconnect();

      socket.off();
    };
    // eslint-disable-next-line
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      // console.log("message: ", message);
    });
  }, []);

  return (
    <div className="chat-window">
      <div className="channel-name-tab top-tab">{roomName}</div>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => ({
  roomName: state.setChatState.currentRoom,
});

export default connect(mapStateToProps, {})(ChatWindow);
