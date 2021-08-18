import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import UserProfile from "./userProfile";
import EditUserProfile from "./editUserProfile";
import PrivateRoute from "./PrivateRoute";

const ProfilePage = ({ user }) => {
  const history = useHistory();

  const displayAccountOptions = () => {
    const arrow = document.querySelector(".dropdown-arrow");
    const accountOptions = document.querySelector(".account-options");

    arrow.classList.toggle("rotate-arrow");
    accountOptions.style.display === "none"
      ? (accountOptions.style.display = "flex")
      : (accountOptions.style.display = "none");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div className="profile-page">
      <header>
        <div className="account" onClick={displayAccountOptions}>
          <div className="image-wrapper">
            <img src={user?.profileImg || '/assests/noAvatar.png'} alt="" />
          </div>
          <span className="user-name">{user.username}</span>
          <span className="material-icons dropdown-arrow">arrow_drop_down</span>
          <div className="account-options" style={{ display: "none" }}>
            <button onClick={() => history.push("/profile")}>
              <span className="material-icons">account_circle</span>
              My Profile
            </button>
            <button onClick={() => history.push("/chat")}>
              <span className="material-icons">people</span>
              Group Chat
            </button>
            <hr />
            <button className="logout-btn" onClick={logout}>
              <span className="material-icons">logout</span>
              Logout
            </button>
          </div>
        </div>
      </header>
      <PrivateRoute
        exact
        path="/profile"
        component={UserProfile}
      ></PrivateRoute>
      <PrivateRoute path="/profile/edit" component={EditUserProfile} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.setUserState.user,
});

export default connect(mapStateToProps, {})(ProfilePage);
