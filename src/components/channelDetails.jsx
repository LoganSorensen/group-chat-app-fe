import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setSidebarComponent } from "../actions/setPageStateActions";

const ChannelDetails = ({ setSidebarComponent, channel, users }) => {
  const [channelUsers, setChannelUsers] = useState([]);

  useEffect(() => {
    setChannelUsers(
      users.filter((user) => channel.channel_name === user.channel)
    );
  }, [channel, users]);

  const handleClick = () => setSidebarComponent("channelList");

  return (
    <div className="channel-details">
      <div className="top-tab align-center">
        <button className="back-btn align-center" onClick={handleClick}>
          <span className="material-icons-outlined">arrow_back_ios</span>
        </button>
        <p>All channels</p>
      </div>
      <div className="channel-info">
        <h2>{channel.channel_name}</h2>
        <p className="channel-desc">{channel.channel_description}</p>
        <h2 className="members-header">Members</h2>
        <div className="member-list">
          {channelUsers?.map((user) => (
            <div key={user.id} className="member align-center">
              <div className="img-wrapper">
                <img src={user.profileImg || '/assests/noAvatar.png'} alt={user.username} />
              </div>
              <p className="user-name">{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channel: state.setChatState.currentChannel,
  users: state.setChatState.users,
});

export default connect(mapStateToProps, { setSidebarComponent })(
  ChannelDetails
);
