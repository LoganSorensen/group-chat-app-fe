import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { setUser } from "../actions/setUserStateActions";

const EditUserProfile = ({ user, setUser }) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    username: "",
    profileImg: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user.id}`)
      .then((res) => {
        setUserInfo({
          username: res.data.username,
          profileImg: res.data.profileImg,
        });
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/users/${user.id}`, userInfo)
      .then((res) => {

        setUser(res.data);
        history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="edit-user-info">
      <Link to="/profile">
        <span className="material-icons">chevron_left</span>Back
      </Link>
      <form id="update-form" onSubmit={handleSubmit}>
        <label htmlFor="edit-photo-field">Photo</label>
        <input
          type="text"
          id="edit-photo-field"
          placeholder="Enter your image url..."
          name="profileImg"
          value={userInfo.profileImg}
          onChange={handleChange}
        />
        <label htmlFor="edit-username-field">Username</label>
        <input
          type="text"
          id="edit-username-field"
          placeholder="Enter your username..."
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.setUserState.user,
});

export default connect(mapStateToProps, { setUser })(EditUserProfile);
