import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setNewChannel } from "../actions/setChatStateActions";
import { baseURL } from "../utils/apiCalls";

const AddChannelForm = ({ setNewChannel }) => {
  const [formState, setFormState] = useState({
    channel_name: "",
    channel_description: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseURL}/channels`, formState)
      .then((res) => {
        setNewChannel(res.data);
      })
      .catch((err) => console.log(err));

    setFormState({ channel_name: "", channel_description: "" });

    closeModal();
  };

  const closeModal = () => {
    const bodyBlackout = document.querySelector(".body-blackout");
    const addChannelForm = document.querySelector(".add-channel-form");

    bodyBlackout.style.display = "none";
    addChannelForm.style.display = "none";
  };

  return (
    <div className="add-channel-form">
      <div className="channel-form-header">
        <h3>New Channel</h3>
        <button className="close-modal-btn" onClick={closeModal}>
          <span className="material-icons-outlined">close</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="channel_name"
          value={formState.channel_name}
          placeholder="Channel name"
          onChange={handleChange}
        />
        <textarea
          name="channel_description"
          value={formState.channel_description}
          placeholder="Channel Description"
          onChange={handleChange}
        ></textarea>
        <button className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default connect(null, { setNewChannel })(AddChannelForm);
