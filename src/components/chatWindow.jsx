import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import Message from "./message";
import MessageInput from "./messageInput";
import {
  setChannelUsers,
  setCurrentChannel,
} from "../actions/setChatStateActions";

const ChatWindow = ({ channel, setChannelUsers, setCurrentChannel, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [previousChannel, setPreviousChannel] = useState(channel);
  const socket = useRef();

  const { channelId } = useParams();

  useEffect(() => {
    console.log("joining a new room");

    socket.current = io("ws://localhost:8800");

    socket.current.on("message", (data) => {
      // console.log("message data", data);
      setNewMessage(data);
    });
  }, []);

  useEffect(() => {
    setMessages((prev) => [...prev, newMessage]);
  }, [newMessage]);

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

    socket.current.emit("joinRoom", {
      username: user.username,
      channel: channel?.channel_name,
      previousChannel: previousChannel?.channel_name,
    });

    setPreviousChannel(channel);

    // eslint-disable-next-line
  }, [channelId, channel]);

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
    <div className={channel ? "chat-window" : "no-channel chat-window"}>
      <div className="channel-name-tab top-tab">{channel?.channel_name}</div>
      {channel ? (
        <div>
          <div className="messages">
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>
          <MessageInput sendMessage={sendMessage} />
        </div>
      ) : (
        <div className="join-channel-msg">
          Join a channel to start chatting!
        </div>
      )}
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
