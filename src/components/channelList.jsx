import React from "react";
import { connect } from "react-redux";

import { channels } from "../utils/data";
import { setSidebarComponent } from "../actions/setPageStateActions";

const ChannelList = ({ setSidebarComponent }) => {
  const joinChannel = () => setSidebarComponent("channelDetails");

  return (
    <div className="channel-list">
      <div className="top-tab align-center">
        Channels
        <button className="add-channel-btn flex-center">
          <span className="material-icons-outlined">add</span>
        </button>
      </div>
      <div className="search-channels align-center">
        <span className="material-icons-outlined">search</span>
        <input type="text" placeholder="Search" />
      </div>
      <div className="channels">
        {channels.map((channel) => (
          <div className="channel align-center" onClick={joinChannel}>
            <div className="channel-abbr flex-center">{channel.abbr}</div>
            <p className="channel-name">{channel.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connect(null, { setSidebarComponent })(ChannelList);
