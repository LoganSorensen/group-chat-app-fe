import React, { useState } from "react";
import { connect } from "react-redux";

import UserOptions from "./userOptions";

const UserTab = ({ user }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggleUserOptions = () => setOptionsOpen(!optionsOpen);

  return (
    <div className="user-tab align-center justify-between">
      <div className="user-info align-center">
        <div className="img-wrapper">
          <img src={user.profileImg} alt={user.username} />
        </div>
        <p className="user-name">{user.username}</p>
      </div>
      <button className="options-btn align-center" id="options-btn">
        <span
          className="material-icons-outlined options-arrow"
          style={{ transform: optionsOpen ? "rotate(180deg)" : null }}
          onClick={toggleUserOptions}
        >
          expand_more
        </span>
      </button>
      <UserOptions optionsOpen={optionsOpen} setOptionsOpen={setOptionsOpen} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.setUserState.user,
});

export default connect(mapStateToProps, {})(UserTab);
