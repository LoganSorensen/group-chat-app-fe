import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { messages } from "../utils/data";
import Message from "./message";
import MessageInput from "./messageInput";

let socket;

const ChatWindow = ({ channel }) => {
  const [messages, setMessages] = useState([]);

  const { channelId } = useParams();

  const ENDPOINT = "localhost:5000";

  const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/messages/${channelId}`)
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));

    console.log("this is running");
    socket = io(ENDPOINT, connectionOptions);

    let username = "John";
    let room = channel.channel_name;

    socket.emit("joinRoom", { username, room });
    console.log("joined");

    return () => {
      socket.disconnect();
      socket.off();
    };
    // eslint-disable-next-line
  }, [ENDPOINT, channelId]);

  useEffect(() => {
    const chatMessages = document.querySelector(".messages");
    socket.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }, []);

  const sendMessage = (message) => {
    console.log("hitting");
    if (message) socket.emit("chatMessage", message);
  };

  return (
    <div className="chat-window">
      <div className="channel-name-tab top-tab">{channel.channel_name}</div>

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
  channel: state.setChatState.currentChannel,
});

export default connect(mapStateToProps, {})(ChatWindow);
