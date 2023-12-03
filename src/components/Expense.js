import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expense.module.css";

const Expense = () => {
  return (
    <>
      <header className={classes.headerExpense}>
        <div className={classes.h}> Welcome to Expense Tracker</div>
        <div className={classes.profile}>
          <span>Your Profile is Incomplete</span>
          <NavLink to="/profile" activeClassName="profile">
            Complete Profile
          </NavLink>
        </div>
      </header>

      <div className={classes.line}></div>
    </>
  );
};

export default Expense;
