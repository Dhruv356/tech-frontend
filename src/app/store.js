import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { cartMiddleware } from "./features/cart/cartSlice"; // ✅ Ensure correct import

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
