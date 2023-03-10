import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTopLoading } from "../../store/slices/appConfigSlice";
import axiosInstance from "../../utils/axiosInstance";
import "./SignUp.scss";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch= useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(setTopLoading(true));
      const response = await axiosInstance.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log(response);
      
      window.location.replace('/#/login');
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setTopLoading(false));
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <form onSubmit={handleSubmit}>
          <h2 className="logo">Communal</h2>
          <h2 className="below-logo">Sign up to see photos and videos from your friends.</h2>
          {/* <label htmlFor="name">Name</label> */}
          <input
            type="text"
            className="name"
            id="name"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
            className="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="login-heading">Already have an account? <Link to="/login">Login</Link></p>
          <button type="submit" className="submit-btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
