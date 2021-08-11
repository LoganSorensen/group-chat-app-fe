import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

// import { messages } from "../utils/data";
import Message from "./message";
import MessageInput from "./messageInput";
import {
  setChannelUsers,
  setCurrentChannel,
} from "../actions/setChatStateActions";

// let socket;

const ChatWindow = ({ channel, setChannelUsers, setCurrentChannel, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [previousChannel, setPreviousChannel] = useState(channel);
  const socket = useRef();

  const { channelId } = useParams();

  // const ENDPOINT = "localhost:5000";

  // const connectionOptions = {
  //   "force new connection": true,
  //   reconnectionAttempts: "Infinity",
  //   timeout: 10000,
  //   transports: ["websocket"],
  // };

  console.log(channel);

  useEffect(() => {
    console.log("joining a new room");

    socket.current = io("ws://localhost:8800");

    socket.current.on("message", (data) => {
      console.log("message data", data);
      setNewMessage(data);
    });
  }, []);

  useEffect(() => {
    setMessages((prev) => [...prev, newMessage]);
  }, [newMessage]);

  // console.log(messages);

  // Gets previous messages from a room
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/messages/${channelId}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));

    // socket = io(ENDPOINT, connectionOptions);

    // let username = "John";
    // let room = channel.channel_name;
    // console.log(room)

    console.log(
      `leaving ${previousChannel?.channel_name} and joining ${channel?.channel_name}`
    );

    socket.current.emit("joinRoom", {
      username: user.username,
      channel: channel?.channel_name,
      previousChannel: previousChannel?.channel_name
    });

    setPreviousChannel(channel)

    // console.log(channel.channel_name);

    // return () => {
    //   socket.current.disconnect();
    //   socket.current.off();
    // };
    // eslint-disable-next-line
  }, [channelId]);

  console.log(channelId);

  // useEffect(() => {
  //   const chatMessages = document.querySelector(".messages");
  //   socket.on("message", (message) => {
  //     console.log('getting a message')
  //     setMessages((messages) => [...messages, message]);

  //     // Scroll to bottom
  //     chatMessages.scrollTop = chatMessages.scrollHeight;
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("roomData", ({ users }) => setChannelUsers(users));
  //   // eslint-disable-next-line
  // }, []);

  const sendMessage = (message) => {
    socket.current.emit("chatMessage", {
      senderId: user.id,
      message,
      channel: channel.channel_name,
    });
  };

  return (
    <div className="chat-window">
      <div className="channel-name-tab top-tab">{channel?.channel_name}</div>

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
  user: state.setUserState.user,
});

export default connect(mapStateToProps, { setChannelUsers, setCurrentChannel })(
  ChatWindow
);
