import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import expenseReducer from "./expense";
import cartReducer from "./cart";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, cart: cartReducer },
});

export default store;
