import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  isPremium: false,
  darkMode: false,
  premiumFeature: false,
  notification: null,
};

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

    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },

    premiumFeature(state) {
      state.premiumFeature = !state.premiumFeature;
    },

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
const calculateTotalAmount = (items) => {
  return items.reduce((sum, [, expense]) => sum + parseInt(expense.amount), 0);
};

export const expenseAction = expenseSlice.actions;

export default expenseSlice.reducer;
