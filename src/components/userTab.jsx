import React from "react";

import { members } from "../utils/data";

const UserTab = () => {
  return (
    <div className="user-tab align-center justify-between">
      <div className="user-info align-center">
        <div className="img-wrapper">
          <img src={members[0].image} alt={members[0].name} />
        </div>
        <p className="user-name">{members[0].name}</p>
      </div>
      <button className="options-btn align-center">
        <span className="material-icons-outlined">expand_more</span>
      </button>
    </div>
  );
};

export default UserTab;
