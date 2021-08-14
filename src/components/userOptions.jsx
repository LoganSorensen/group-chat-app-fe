import React from "react";
import { Link, useHistory } from "react-router-dom";

const UserOptions = ({ optionsOpen, setOptionsOpen }) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
    // history.push("/");
  };

  const handleBlur = (e) => {
    const optionsBtn = document.getElementById("options-btn");
    console.log("running");
    if (
      !e.currentTarget.contains(e.relatedTarget) &&
      e.relatedTarget !== optionsBtn
    )
      setOptionsOpen(!optionsOpen);
  };

  return (
    <div
      className="user-options"
      id="user-options"
      style={{ display: optionsOpen ? "block" : "none" }}
      tabIndex="0"
      onBlur={handleBlur}
    >
      <Link to="/profile" className="align-center">
        <span className="material-icons">account_circle</span>
        My Profile
      </Link>
      <Link to="#" className="align-center">
        <span className="material-icons-outlined">landscape</span>
        Tweeter
      </Link>
      <hr />
      <button className="logout-btn align-center" onClick={logout}>
        <span className="material-icons-outlined">exit_to_app</span>Logout
      </button>
    </div>
  );
};

export default UserOptions;
