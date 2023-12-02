import React from "react";
import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Expense from "./components/Expense";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Profile from "./components/Profile";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      <Header />

      <Route exact path="/login">
        {!authCtx.isloggedin && <Login />}
        {authCtx.isloggedin && <Redirect to="/expense" />}
      </Route>

      <Switch>
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
