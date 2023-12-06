import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartVisible: false };
const uiSlice = createSlice({
  name: "ui-slice",
  initialState: initialState,
  reducers: {
    //map of reducer
    toggle(state) {
      state.cartVisible = !state.cartVisible;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
