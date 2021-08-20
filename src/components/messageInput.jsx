import React, { useState } from "react";
import { connect } from "react-redux";

const MessageInput = ({ sendMessage, currentChannel }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    sendMessage(message);
  };

  return (
    <div className="message-input">
      <form className="align-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          placeholder={`Message ${currentChannel.channel_name}`}
          onChange={handleChange}
        />
        <button className="flex-center">
          <span className="material-icons">send</span>
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentChannel: state.setChatState.currentChannel,
});

export default connect(mapStateToProps, {})(MessageInput);
