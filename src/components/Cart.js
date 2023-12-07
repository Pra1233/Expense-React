import React from "react";
import Modal from "./UI/Modal";
import classes from "./Cart.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/cart";
import { useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((item) => item.cart.items);
  const totalAmount = useSelector((item) => item.cart.totalAmount);

  const hideCart = () => {
    dispatch(cartAction.toggleCart());
  };

  const incrementHandler = (i) => {
    dispatch(
      cartAction.addToCart({
        id: i.id,
        amount: i.amount,
        category: i.category,
        description: i.description,
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      })
    );
  };

  const decrementHandler = (id) => {
    dispatch(cartAction.removeFromCart(id));
  };

  return (
    <Modal>
      {items.map((i) => (
        <div key={i.id} className="item-container">
          <h3>Description: {i.description}</h3>
          <div className="amount-section">
            <p>Amount: ${i.amount}</p>
          </div>
          <div className="quantity-section">
            <p>Quantity: {i.quantity}</p>
          </div>
          <div className="total-section">
            <p>Total: ${i.totalAmount}</p>
          </div>
          <div className="buttons-section">
            <button onClick={() => incrementHandler(i)}>+</button>
            <button onClick={() => decrementHandler(i.id)}>-</button>
          </div>
        </div>
      ))}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount} </span>
      </div>

      <div className={classes.actions}>
        <button className={classes.button} onClick={hideCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
