import { createSlice } from "@reduxjs/toolkit";

const initalAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initalAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true; //originally code transform we are mutaiting original state
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
