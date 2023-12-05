import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Expense from "./components/Expense";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Profile from "./components/Profile";
// import AuthContext from "./store/auth-context";
import { useSelector } from "react-redux";

function App() {
  // const token = useSelector((state) => state.auth.token);
  const token = useSelector((state) => state.auth.token);
  const islogin = !!token;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
