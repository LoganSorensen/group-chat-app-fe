import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const UserProfile = ({ user }) => {
  const history = useHistory();

  return (
    <div className="user-profile">
      <h2>Personal info</h2>
      <p>Basic info, like your name and photo</p>
      <div className="user-profile-info">
        <div className="user-info-header">
          <div>
            <h3>Profile</h3>
            <span>Some info may be visible to other people</span>
          </div>
          <button onClick={() => history.push("/profile/edit")}>Edit</button>
        </div>
        <div className="user-info-row photo-row">
          <span className="row-name">Photo</span>
          <div className="image-wrapper">
            <img src={user.profileImg || "/assets/noAvatar.png"} alt="" />
          </div>
        </div>
        <div className="user-info-row name-row">
          <span className="row-name">Username</span>
          <span className="row-data">{user.username}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.setUserState.user,
});

export default connect(mapStateToProps, {})(UserProfile);
