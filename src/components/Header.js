import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expense.module.css";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const islogin = !!token;
  const isPremium = useSelector((state) => state.expense.isPremium);
  console.log(isPremium, "isPrem");
  const key = "AIzaSyBsDLPBGuT6kOlPdPc5f-SeSOz-Xdjyj0s";
  const onLogout = () => {
    dispatch(authActions.logout());
  };

  const verifyEmail = async () => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Verification email sent successfully to:", data.email);
        alert("Successful");
      } else {
        const data = await res.json();
        console.error("Error Sending Verification Email", data.error.message);
        alert(data.error.message);
      }
    } catch (e) {
      console.error("Error", e.message);
      alert(e.message);
    }
  };

  return (
    <div className={classes.header}>
      {!islogin && (
        <NavLink to="/login" className={classes.login}>
          Login
        </NavLink>
      )}
      {islogin && (
        <button onClick={onLogout} className={classes.logout}>
          Logout
        </button>
      )}

      {isPremium && <button>Activate Premium Button</button>}

      {islogin && (
        <button className={classes.logout} onClick={verifyEmail}>
          Verify Email
        </button>
      )}
    </div>
  );
};

export default Header;
