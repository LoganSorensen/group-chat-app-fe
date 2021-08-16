import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setSidebarComponent } from "../actions/setPageStateActions";
import { setCurrentChannel } from "../actions/setChatStateActions";

const Channel = ({ channel, setCurrentChannel, setSidebarComponent }) => {
  const joinChannel = (channel) => {
    setCurrentChannel(channel);
    setSidebarComponent("channelDetails");
  };

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

    if (words.length > 1) {
      for (let i = 0; i <= 1; i++) {
        abbr = abbr + allowedWords[i].charAt(0);
      }
    } else {
      abbr = words[0].charAt(0);
    }

    return abbr;
  };

  return (
    <Link
      to={`/chat/${channel.id}`}
      className="channel align-center"
      name={channel.channel_name}
      onClick={() => joinChannel(channel)}
    >
      <div className="channel-abbr flex-center">
        {abbreviateName(channel.channel_name)}
      </div>
      <p className="channel-name">{channel.channel_name}</p>
    </Link>
  );
};

export default connect(null, { setSidebarComponent, setCurrentChannel })(
  Channel
);
