import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { setSidebarComponent } from "../actions/setPageStateActions";
import { setCurrentChannel } from "../actions/setChatStateActions";

const ChannelList = ({ setSidebarComponent, setCurrentChannel }) => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/channels")
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const abbreviateName = (name) => {
    const words = name.split(" ");
    const ignoredWords = ["a", "an", "the", "and"];
    const allowedWords = [];

    let abbr = "";

    words.forEach((word) => {
      if (!ignoredWords.includes(word.toLowerCase())) {
        allowedWords.push(word);
      }
    });

    for (let i = 0; i <= 1; i++) {
      abbr = abbr + allowedWords[i].charAt(0);
    }

    return abbr;
  };

  const joinChannel = (channel) => {
    setCurrentChannel(channel);
    setSidebarComponent("channelDetails");
  };

  const openModal = () => {
    const bodyBlackout = document.querySelector(".body-blackout");
    const addChannelForm = document.querySelector(".add-channel-form");

    bodyBlackout.style.display = "block";
    addChannelForm.style.display = "block";
  };

  const bodyBlackout = document.querySelector(".body-blackout");

  const closeModal = () => {
    const addChannelForm = document.querySelector(".add-channel-form");

    bodyBlackout.style.display = "none";
    addChannelForm.style.display = "none";
  };

  bodyBlackout.addEventListener("click", closeModal);

  return (
    <div className="channel-list">
      <div className="top-tab align-center">
        Channels
        <button className="add-channel-btn flex-center" onClick={openModal}>
          <span className="material-icons-outlined">add</span>
        </button>
      </div>
      <div className="search-channels align-center">
        <span className="material-icons-outlined">search</span>
        <input type="text" placeholder="Search" />
      </div>
      <div className="channels">
        {channels.map((channel, index) => (
          <Link
            to={`/${channel.id}`}
            key={index}
            className="channel align-center"
            name={channel.channel_name}
            onClick={() => joinChannel(channel)}
          >
            <div className="channel-abbr flex-center">
              {abbreviateName(channel.channel_name)}
            </div>
            <p className="channel-name">{channel.channel_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { setSidebarComponent, setCurrentChannel })(
  ChannelList
);
