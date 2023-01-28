import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  setItem,
} from "../../utils/localStorageManager";
import "./Login.scss";
import phonneImg from '../../assets/phone-image.png'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      console.log(response);

      const accesstoken = response.data.result.accesstoken;
      setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accesstoken);
      if(response.data.status==='ok')
        window.location.replace('/');
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <div className="phone-image-container">
        <img src={phonneImg} alt="phone" />
      </div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <h2>Sociogram</h2>
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            className="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            placeholder="Password"
            className="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="signup-heading">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <button type="submit" className="submit-btn">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
