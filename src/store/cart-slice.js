import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: [], totalQuantity: 0, totalAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItems(state, action) {
      const newitem = action.payload;
      const existingitem = state.items.find((item) => item.id === newitem.id);
      if (existingitem) {
        existingitem.quantity++;
        existingitem.totalPrice = existingitem.totalPrice + newitem.price;
      } else {
        state.items.push({
          id: newitem.id,
          price: newitem.price,
          quantity: 1,
          totalPrice: newitem.price,
          name: newitem.title,
        });
      }
      state.totalQuantity++;
    },
    removeItem(state, action) {
      const id = action.payload;

      const existingitem = state.items;
      const index = state.items.findIndex((item) => item.id === id);
      if (existingitem[index].quantity === 1) {
        state.items.splice(index, 1);
      } else {
        existingitem[index].quantity--;
        existingitem[index].totalPrice =
          existingitem[index].totalPrice - existingitem[index].price;
      }
      state.totalQuantity--;
    },
  },
});
export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
