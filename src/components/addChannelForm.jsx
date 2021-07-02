import React, { useState } from "react";

const AddChannelForm = () => {
  const [formState, setFormState] = useState({
    channelName: "",
    channelDesc: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormState({ channelName: "", channelDesc: "" });

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
      <h3>New Channel</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="channelName"
          value={formState.channelName}
          placeholder="Channel name"
          onChange={handleChange}
        />
        <textarea
          name="channelDesc"
          value={formState.channelDesc}
          placeholder="Channel Description"
          onChange={handleChange}
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
};

export default AddChannelForm;
