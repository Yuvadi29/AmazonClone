import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";


// The Global Store Setup
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});