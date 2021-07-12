import React from "react";
import { connect } from "react-redux";

import { members } from "../utils/data";
import { setSidebarComponent } from "../actions/setPageStateActions";

const ChannelDetails = ({ setSidebarComponent, channel }) => {
  const handleClick = () => setSidebarComponent("channelList");
console.log({channel})
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
        <p className="channel-desc">
          {channel.channel_description}
        </p>
        <h2 className="members-header">Members</h2>
        <div className="member-list">
          {members.map((member, index) => (
            <div key={index} className="member align-center">
              <div className="img-wrapper">
                <img src={member.image} alt={member.name} />
              </div>
              <p className="user-name">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  channel: state.setChatState.currentChannel,
})

export default connect(mapStateToProps, { setSidebarComponent })(ChannelDetails);
