import React from "react";
import { useRef } from "react";
import classes from "./ForgotPassword.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const emailInput = useRef();
  const [loading, setLoading] = useState(false);
  const key = "AIzaSyBsDLPBGuT6kOlPdPc5f-SeSOz-Xdjyj0s";

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    Post();
  };

  const Post = async () => {
    try {
      const email = emailInput.current.value;
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();

        data && alert("Password Send Successfully");
        console.log(data);
      } else {
        const data = await res.json();
        let errorMsg;
        if (data.error.message) {
          errorMsg = data.error.message;
        } else errorMsg = "Reset Password Failed";
        console.error(errorMsg);
        alert(errorMsg);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className={classes.background}>
      <form>
        <h3>Forgot Password</h3>

        <label htmlFor="username">Enter Registered Email</label>
        <input type="text" placeholder="Email" id="username" ref={emailInput} />

        <button onClick={submitHandler} className={classes.forgotbutton}>
          {loading ? "Loading ..." : "Send A Link"}
        </button>
        <NavLink to="/login">Already a User</NavLink>
      </form>
    </div>
  );
};

export default ForgotPassword;
