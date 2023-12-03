import React from "react";
import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Expense from "./components/Expense";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Profile from "./components/Profile";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Header />

      <Route exact path="/">
        {authCtx.isloggedin && <Redirect to="/expense" />}
        {!authCtx.isloggedin && <Redirect to="/login" />}
      </Route>

      <Switch>
        <Route exact path="/login">
          {!authCtx.isloggedin && <Login />}
          {authCtx.isloggedin && <Redirect to="/expense" />}
        </Route>

        <Route exact path="/ForgotPassword">
          {!authCtx.isloggedin && <ForgotPassword />}
        </Route>

        <Route path="/expense">
          {authCtx.isloggedin && <Expense />}
          {!authCtx.isloggedin && <Redirect to="/login" />}
        </Route>

        <Route path="/profile">
          {authCtx.isloggedin && <Profile />}
          {!authCtx.isloggedin && <Redirect to="/login" />}
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
