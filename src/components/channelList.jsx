import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Channel from "./channel";
import { baseURL } from "../utils/apiCalls";

const ChannelList = ({ newChannel }) => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}/channels`)
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (newChannel) setChannels((prev) => [...prev, newChannel]);
  }, [newChannel]);

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

  const handleChange = (e) => {
    setQuery(e.target.value);
    setFilteredChannels(
      channels.filter((channel) =>
        channel.channel_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

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
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
      </div>
      <div className="channels">
        {query
          ? filteredChannels.map((channel) => (
              <Channel key={channel.id} channel={channel} />
            ))
          : channels.map((channel) => (
              <Channel key={channel.id} channel={channel} />
            ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  newChannel: state.setChatState.newChannel,
});

export default connect(mapStateToProps, {})(ChannelList);
