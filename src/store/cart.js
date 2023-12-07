import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  showCart: false,
  totalQuantity: 0,
  totalAmount: 0,
  changed: false,
};
// id, amount, category, description, quantity
const cartSlice = createSlice({
  name: "cart-slice",
  initialState: initialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addToCart(state, action) {
      const newitem = action.payload;
      const existingItem = state.items.find((item) => item.id === newitem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalAmount =
          parseFloat(existingItem.totalAmount) + parseFloat(newitem.amount);
        state.totalAmount += parseFloat(newitem.amount);
      } else {
        state.items.push({
          id: newitem.id,
          amount: newitem.amount,
          category: newitem.category,
          description: newitem.description,
          quantity: 1,
          totalAmount: newitem.amount,
        });
        state.totalAmount += parseFloat(newitem.amount);
      }
      state.totalQuantity++;
      state.changed = true;
    },

    removeFromCart(state, action) {
      const newid = action.payload;
      const index = state.items.findIndex((item) => item.id === newid);
      const existingitem = state.items;
      if (existingitem[index].quantity > 1) {
        existingitem[index].quantity--;
        existingitem[index].totalAmount -= existingitem[index].amount;
        state.totalAmount -= parseFloat(state.items[index].amount);
      } else {
        state.totalAmount -= parseFloat(state.items[index].amount);
        state.items.splice(index, 1);
      }
      state.totalQuantity--;
      state.changed = true;
    },

    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
