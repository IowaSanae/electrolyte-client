import { createSlice } from '@reduxjs/toolkit';

interface initial {
  total_cart: number;
}
const initialState: initial = {
  total_cart: 0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    getTotalCart: (state) => {
      state.total_cart = state.total_cart;
    },
    updateTotalCart: (state, action) => {
      state.total_cart = action.payload;
    },
  },
});

export const CartActions = cartSlice.actions;
export default cartSlice.reducer;
