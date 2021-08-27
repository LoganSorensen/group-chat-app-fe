import React, { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";

import UserTab from "./userTab";
import ChannelDetails from "./channelDetails";
import ChannelList from "./channelList";

const Sidebar = ({ sidebarComponent }) => {
  const closeSidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.remove("sidebar--open");
  };

  // updates window.innerHeight on resize
  const useWindowSize = () => {
    const [height, setHeight] = useState(window.innerHeight);

    useLayoutEffect(() => {
      function updateHeight() {
        setHeight(window.innerHeight);
      }
      window.addEventListener("resize", updateHeight);
      updateHeight();
      return () => window.removeEventListener("resize", updateHeight);
    }, []);
    return height;
  };

  return (
    <div className="sidebar" style={{ height: useWindowSize() }}>
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
