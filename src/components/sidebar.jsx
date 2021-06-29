import React from "react";

import UserTab from "./userTab";
import ChannelDetails from "./channelDetails";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ChannelDetails />
      <UserTab />
    </div>
  );
};

export default Sidebar;
