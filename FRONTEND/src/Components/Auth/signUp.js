import React, { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="login">
      <div className="card login__card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
          SignUp
        </button>
        <h5>
          <Link to="/login">
            Already have an account? <b>Sign In</b>
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default SignUp;
