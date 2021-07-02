import React, { useState } from "react";

import { members } from "../utils/data";
import UserOptions from "./userOptions";

const UserTab = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const toggleUserOptions = () => setOptionsOpen(!optionsOpen);

  return (
    <div className="user-tab align-center justify-between">
      <div className="user-info align-center">
        <div className="img-wrapper">
          <img src={members[0].image} alt={members[0].name} />
        </div>
        <p className="user-name">{members[0].name}</p>
      </div>
      <button className="options-btn align-center" id="options-btn">
        <span
          className="material-icons-outlined"
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

export default UserTab;
