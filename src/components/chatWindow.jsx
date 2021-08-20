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
import { baseURL } from "../utils/apiCalls";

const ChatWindow = ({ channel, setChannelUsers, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [previousChannel, setPreviousChannel] = useState(channel);
  const socket = useRef();
  const scrollRef = useRef();

  const { channelId } = useParams();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current = io("https://lsorensen-group-chat-app.herokuapp.com/");

    socket.current.on("message", (data) => setNewMessage(data));
  }, []);

  useEffect(() => {
    setMessages((prev) => [...prev, newMessage]);
  }, [newMessage]);

  // Gets previous messages from a room
  useEffect(() => {
    axios
      .get(`${baseURL}/messages/${channelId}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));

    socket.current.emit("joinRoom", {
      username: user.username,
      profileImg: user.profileImg,
      channel: channel?.channel_name,
      previousChannel: previousChannel?.channel_name,
    });

    setPreviousChannel(channel);

    // eslint-disable-next-line
  }, [channelId, channel]);

  useEffect(() => {
    socket.current.on("roomData", (users) => setChannelUsers(users));
    // eslint-disable-next-line
  }, [user]);

  const sendMessage = (message) => {
    socket.current.emit("chatMessage", {
      senderId: user.id,
      message,
      channel: channel.channel_name,
    });
  };

  const openSidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.add("sidebar--open");
  };

  return (
    <div className={channel ? "chat-window" : "no-channel chat-window"}>
      <div className="channel-name-tab top-tab">
        <button className="open-sidebar-btn" onClick={openSidebar}>
          <span className="material-icons-outlined">menu</span>
        </button>
        {channel?.channel_name}
      </div>
      {channel ? (
        <div>
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} />
              </div>
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
