import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isloggedin: false,
  login: () => {},
  logout: () => {},
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  const loggedin = !!token;

  const values = {
    token: token,
    isloggedin: loggedin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
