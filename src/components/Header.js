import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./Expense.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);
  const onLogout = () => {
    authCtx.logout();
    localStorage.removeItem("token");
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
    </div>
  );
};

export default Header;
