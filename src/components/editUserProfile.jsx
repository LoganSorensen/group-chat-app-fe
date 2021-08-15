import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux'

const EditUserProfile = ({user}) => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    username: "",

    photo: "",
  });
  const [userImage, setUserImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const userId = localStorage.getItem("id");

  console.log(user)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const addImage = (e) => {
    const file = e.target.files[0];
    setUserImage(file);

    // create a temporary local URL for the file
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const entries = Object.entries(userInfo);
    const updateProps = [];
    const formData = new FormData();

    // format the updated user info
    entries.forEach((entry) => {
      updateProps.push({ propName: entry[0], value: entry[1] });
    });

    // convert the data to json
    const jsonProps = JSON.stringify(updateProps);

    // add the update props (and the new image if applicable) to the formData
    formData.append("data", jsonProps);
    if (userImage) formData.append("userImage", userImage);

    axios
      .put(`http://localhost:5000/users/${userId}`, formData)
      .then((res) => {
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
        <div className="edit-image">
          <div className="image-wrapper">
            <span className="material-icons">photo_camera</span>
            <img src={imagePreview ? imagePreview : userInfo.photo} alt="" />
          </div>
          <label htmlFor="file-upload">Change Photo</label>
          <input
            type="file"
            name="photo"
            id="file-upload"
            onChange={addImage}
          />
        </div>

        <label htmlFor="edit-username-field">Username</label>
        <input
          type="text"
          id="edit-username-field"
          placeholder="Enter your username..."
          name="username"
          value={userInfo.name}
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

export default connect(mapStateToProps, {})(EditUserProfile);
