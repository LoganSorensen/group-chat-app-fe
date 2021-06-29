import React from "react";

import { members } from "../utils/data";

const ChannelDetails = () => {
  return (
    <div className="channel-details">
      <div className="top-tab align-center">
        <button className="back-btn align-center">
          <span className="material-icons-outlined">arrow_back_ios</span>
        </button>
        <p>All channels</p>
      </div>
      <div className="channel-info">
        <h2>Front-End Developers</h2>
        <p className="channel-desc">
          Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan
          quis. In gravida mollis purus, at interdum arcu tempor non
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

export default ChannelDetails;
