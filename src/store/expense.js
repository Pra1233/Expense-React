import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalAmount: 0, isPremium: false };

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    saveItem(state, action) {
      console.log(action.payload, "payload");
      state.items = action.payload;
      state.totalAmount = calculateTotalAmount(action.payload);
      state.isPremium = state.totalAmount > 10000;
    },
  },
});
const calculateTotalAmount = (items) => {
  return items.reduce((sum, [, expense]) => sum + parseInt(expense.amount), 0);
};

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
