import React from "react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Expense.module.css";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { expenseAction } from "../store/expense";
import { useDispatch } from "react-redux";

const Expense = () => {
  const amountInput = useRef();
  const descriptionInput = useRef();
  const categoryInput = useRef();
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();

  const url = "https://ecommerce-66b74-default-rtdb.firebaseio.com/";

  useEffect(() => {
    getExpense();
  }, []);

  const deleteHandler = async (id) => {
    console.log(id, "id");
    try {
      const res = await axios.delete(`${url}expense/${id}.json`);
      getExpense();
      console.log(res, "ss");
    } catch (e) {
      console.log(e);
    }
  };

  const editHandler = (id, e) => {
    document.getElementById("amount").value = e.amount;
    document.getElementById("des").value = e.description;
    document.getElementById("category").value = e.category;

    deleteHandler(id);
  };

  const getExpense = async () => {
    try {
      const res = await fetch(`${url}expense.json`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const arr = Object.entries(data);
        dispatch(expenseAction.saveItem(arr));
        setExpenses(arr);
      } else {
        const data = await res.json();
        let errorMsg = "Post Expense Fail";
        if (data.error.message) {
          errorMsg = data.error.message;
        }
        console.log(errorMsg);
        alert(errorMsg);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const expenseHandler = async () => {
    const amount = amountInput.current.value;
    const description = descriptionInput.current.value;
    const category = categoryInput.current.value;
    console.log(amount, description, category);

    try {
      const res = await fetch(`${url}expense.json`, {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          description: description,
          category: category,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        getExpense();
      } else {
        const data = await res.json();
        let errorMsg = "Post Expense Fail";
        if (data.error.message) {
          errorMsg = data.error.message;
        }
        console.log(errorMsg);
        alert(errorMsg);
      }
    } catch (e) {
      console.error(e);
    }
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
            id="amount"
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
            id="des"
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select ref={categoryInput} className={classes.input} id="category">
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
      <ExpenseList
        expenses={expenses}
        onDelete={deleteHandler}
        onEdit={editHandler}
      />
    </>
  );
};

export default Expense;
