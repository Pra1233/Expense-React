import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Expense from "./components/Expense";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/UI/Notification";
import { getData, postData } from "./store/cart-action";

let initial = true;
function App() {
  const token = useSelector((state) => state.auth.token);
  const islogin = !!token;

  const darkMode = useSelector((state) => state.expense.darkMode);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.expense.notification);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (cart.changed) {
      dispatch(postData(cart));
    }
  }, [dispatch, cart]);

  return (
    <div className={darkMode ? "dark" : "light"}>
      {notification && islogin && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Header />

      <Route exact path="/">
        {islogin && <Redirect to="/expense" />}
        {!islogin && <Redirect to="/login" />}
      </Route>

      <Switch>
        <Route exact path="/login">
          {!islogin && <Login />}
          {islogin && <Redirect to="/expense" />}
        </Route>

        <Route exact path="/ForgotPassword">
          {!islogin && <ForgotPassword />}
        </Route>

        <Route path="/expense">
          {islogin && <Expense />}
          {!islogin && <Redirect to="/login" />}
        </Route>

        <Route path="/profile">
          {islogin && <Profile />}
          {!islogin && <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
