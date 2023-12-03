import React from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expense.module.css";

const Expense = () => {
  const amountInput = useRef();
  const descriptionInput = useRef();
  const categoryInput = useRef();

  const expenseHandler = () => {
    const amount = amountInput.current.value;
    const description = descriptionInput.current.value;
    const category = categoryInput.current.value;
    console.log(amount, description, category);

    const ul = document.getElementById("ul");
    const li = document.createElement("li");
    li.innerHTML += `Amount ${amount} - Description ${description} -Category ${category} `;
    ul.appendChild(li);
  };
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

      <div className={classes.expense}>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            ref={amountInput}
            className={classes.input}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Enter Description"
            required
            className={classes.input}
            ref={descriptionInput}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select ref={categoryInput} className={classes.input}>
            <option>Select Item</option>
            <option value="Food">Food</option>
            <option value="Clothes">Clothes</option>
            <option value="Medicine">Medicine</option>
          </select>
        </div>

        <button onClick={expenseHandler} className={classes.button}>
          Add
        </button>
      </div>
      <li id="ul"></li>
    </>
  );
};

export default Expense;
