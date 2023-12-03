import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./Expense.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const key = "AIzaSyBsDLPBGuT6kOlPdPc5f-SeSOz-Xdjyj0s";
  const onLogout = () => {
    authCtx.logout();
    localStorage.removeItem("token");
  };

  const verifyEmail = async () => {
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
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
      {!authCtx.isloggedin && (
        <NavLink to="/login" className={classes.login}>
          Login
        </NavLink>
      )}
      {authCtx.isloggedin && (
        <button onClick={onLogout} className={classes.logout}>
          Logout
        </button>
      )}
      {authCtx.isloggedin && (
        <button className={classes.logout} onClick={verifyEmail}>
          Verify Email
        </button>
      )}
    </div>
  );
};

export default Header;
