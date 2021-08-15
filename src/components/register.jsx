import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { setUser } from "../actions/setUserStateActions";

const Register = ({ setUser }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/auth/register", userCredentials)
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        history.push("/chat");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper email-wrapper">
          <span className="material-icons email-icon">person</span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={userCredentials.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-wrapper">
          <span className="material-icons lock-icon">lock</span>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userCredentials.password}
            onChange={handleChange}
          />
        </div>
        <button>Start chatting now</button>
      </form>
      <p className="switch-auth">
        Already a member? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default connect(null, { setUser })(Register);
