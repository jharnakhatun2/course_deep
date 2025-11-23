// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import type { CartItem } from "../../ult/types/types";


const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.find(item => item.productId === product.productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.productId !== action.payload);
    },
    clearCart: () => {
      return [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
