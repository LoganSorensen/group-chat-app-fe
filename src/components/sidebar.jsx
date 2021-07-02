import React from "react";
import { connect } from "react-redux";

import UserTab from "./userTab";
import ChannelDetails from "./channelDetails";
import ChannelList from "./channelList";

const Sidebar = ({ sidebarComponent }) => {
  return (
    <div className="sidebar">
      {sidebarComponent === "channelDetails" && <ChannelDetails />}
      {sidebarComponent === "channelList" && <ChannelList />}
      <UserTab />
    </div>
  );
};

const mapStateToProps = (state) => ({
  sidebarComponent: state.setPageState.sidebarComponent,
});

export default connect(mapStateToProps, {})(Sidebar);
