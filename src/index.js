import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { AuthContextProvider } from "./store/auth-context";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthContextProvider>

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </AuthContextProvider>
);
