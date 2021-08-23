import React from "react";
import { connect } from "react-redux";

import UserTab from "./userTab";
import ChannelDetails from "./channelDetails";
import ChannelList from "./channelList";

const Sidebar = ({ sidebarComponent }) => {
  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.remove("sidebar--open");
  };

  return (
    <div className="sidebar" style={{ height: window.innerHeight }}>
      <button className="close-sidebar-btn" onClick={closeSidebar}>
        <span className="material-icons-outlined">close</span>
      </button>
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
