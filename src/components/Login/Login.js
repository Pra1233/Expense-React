import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [login, setLogin] = useState(true);

  const switchMode = (e) => {
    e.preventDefault();
    setLogin((prev) => !prev);
  };

  const forgotPasswordHandler = () => {
    history.push("/ForgotPassword");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailInput = email.current.value;
    const passwordInput = password.current.value;

    let url;
    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsDLPBGuT6kOlPdPc5f-SeSOz-Xdjyj0s";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsDLPBGuT6kOlPdPc5f-SeSOz-Xdjyj0s";
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        history.push("/expense");

        // console.log(data, "data");
        authCtx.login(data.idToken);
      } else {
        const data = await res.json();
        let errorMsg = login ? "Login Failed" : "Signup Failed";
        if (data.error.message) {
          errorMsg = data.error.message;
        }
        throw new Error(errorMsg);
      }
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };
  return (
    <div className={classes.background}>
      <form>
        <h3>{login ? "Login Here" : "Signup"}</h3>

        <label htmlFor="username">Email</label>
        <input
          type="text"
          placeholder="Email"
          id="username"
          ref={email}
          className={classes.inputLogin}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          ref={password}
          className={classes.inputLogin}
        />

        <button onClick={submitHandler} className={classes.loginbutton}>
          Submit
        </button>

        <div className={classes.forgot}>
          <button onClick={switchMode} className={classes.switchMode}>
            {login ? "Create New Account" : "Login With Existing Account"}
          </button>

          <button
            onClick={forgotPasswordHandler}
            className={classes.forgotPassword}
          >
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
