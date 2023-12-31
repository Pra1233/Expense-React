import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
// import AuthContext from "../store/auth-context";
import classes from "./Profile.module.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const nameInput = useRef();
  const urlInput = useRef();

  // const authCtx = useContext(AuthContext);
  const key = "AIzaSyBsDLPBGuT6kOlPdPc5f-SeSOz-Xdjyj0s";

  useEffect(() => {
    onGet();
    return () => {};
  });

  const onGet = async () => {
    console.log("onGET", token);
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: token,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const user = data.users;
        console.log(user);

        document.getElementById("name").value = user[0].displayName;
        document.getElementById("url").value = user[0].photoUrl;
      } else {
        const data = await res.json();
        // Handle the error response
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onPost = async (e) => {
    e.preventDefault();
    const name = nameInput.current.value;
    const url = urlInput.current.value;

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify({
            displayName: name,
            photoUrl: url,
            returnSecureToken: true,
            idToken: token,
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        alert("Profile Updated Successfully");
      } else {
        const data = await res.json();
        let errorMsg = "Profile Updation fail";
        if (data.error.message) {
          errorMsg = data.error.message;
        }
        alert(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <form onSubmit={onPost}>
      <label className={classes.label}>Full Name : </label>
      <input
        type="text"
        required
        ref={nameInput}
        id="name"
        className={classes.input}
      />
      <label className={classes.label}>Profile Photo URL : </label>
      <input type="text" ref={urlInput} id="url" className={classes.input} />
      <button>Update</button>
    </form>
  );
};

export default Profile;
