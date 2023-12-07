import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expense.module.css";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { expenseAction } from "../store/expense";

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const islogin = !!token;
  const isPremium = useSelector((state) => state.expense.isPremium);
  const darkMode = useSelector((state) => state.expense.darkMode);
  const premiumFeature = useSelector((state) => state.expense.premiumFeature);
  const expenses = useSelector((state) => state.expense.items);

  const [hidePremium, setHidePremium] = useState(false);

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

  const activatePremiumHandler = () => {
    dispatch(expenseAction.premiumFeature());
    setHidePremium(true);
  };

  const toggleMode = () => {
    dispatch(expenseAction.toggleTheme());
  };

  const downloadHandler = () => {
    const a = document.getElementById("download");

    // Assuming expenses is an array of objects, stringify it
    const expensesString = JSON.stringify(expenses);
    const blob = new Blob([expensesString], { type: "text/plain" });
    a.href = URL.createObjectURL(blob);
    a.download = "expenses.txt";
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

      {isPremium && !hidePremium && (
        <button onClick={activatePremiumHandler} className={classes.login}>
          Activate Premium Button
        </button>
      )}

      {premiumFeature && islogin && (
        <a id="download" onClick={downloadHandler} className={classes.download}>
          Download Expense
        </a>
      )}

      {premiumFeature && islogin && (
        <button onClick={toggleMode} className={classes.login}>
          {!darkMode ? " Enable Dark Mode" : "Enable Light Mode"}
        </button>
      )}

      {islogin && (
        <button className={classes.login} onClick={verifyEmail}>
          Verify Email
        </button>
      )}
    </div>
  );
};

export default Header;
