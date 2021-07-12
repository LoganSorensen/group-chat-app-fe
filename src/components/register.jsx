import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

// import { ReactComponent as Logo } from "../assets/devchallenges.svg";
// import { ReactComponent as LogoLight } from "../assets/devchallenges-light.svg";
// import { ReactComponent as FacebookLogo } from "../assets/Facebook.svg";
// import { ReactComponent as TwitterLogo } from "../assets/Twitter.svg";
// import { ReactComponent as GithubLogo } from "../assets/Github.svg";
// import GoogleLoginBtn from "./googleLoginBtn";

const Register = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/register", userCredentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="auth-form">
      {/* <div className="logo">{prefersDarkMode ? <LogoLight /> : <Logo />}</div> */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper email-wrapper">
          <span className="material-icons email-icon">email</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userCredentials.email}
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
      <p className="alt-auth-opt">or continue with</p>
      <div className="alt-auth-btns">
        {/* <GoogleLoginBtn />
        <FacebookLogo className="logo-btn" />
        <TwitterLogo className="logo-btn" />
        <GithubLogo className="logo-btn" /> */}
      </div>
      <p className="switch-auth">
        Already a member? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
