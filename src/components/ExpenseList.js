import React from "react";
import classes from "./Expense.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/cart";

const ExpenseList = (props) => {
  const [id, expenseData] = props.expense;
  const { amount, category, description } = expenseData;
  const quantity = 1;
  const totalPrice = 0;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartAction.addToCart({
        id: id,
        amount: amount,
        category: category,
        description: description,
        quantity: quantity,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <div className={classes.card}>
      <h2>Amount: {amount}</h2>
      <p>Description: {description}</p>
      <p>Category: {category}</p>
      <button onClick={() => props.onEdit(id, expenseData)}>Edit</button>
      <button onClick={() => props.onDelete(id)}>Delete</button>
      <button onClick={addToCartHandler}>Add to Cart</button>
    </div>
  );
};

export default ExpenseList;
