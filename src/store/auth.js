import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // isAuthenticated: false,
  token: localStorage.getItem("token") || "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state) {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
      }
      //   state.token = action.payload;
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
