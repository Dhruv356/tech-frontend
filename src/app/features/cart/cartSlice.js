import { createSlice } from "@reduxjs/toolkit";

// Get current user ID
const userId = localStorage.getItem("userId");
const cartKey = userId ? `cartList_${userId}` : "cartList_guest";

// Load cart from localStorage for the specific user
const storedCartList =
  localStorage.getItem(cartKey) !== null
    ? JSON.parse(localStorage.getItem(cartKey))
    : [];

const initialState = {
  cartList: storedCartList,
};

const getProductId = (product) => product.id || product._id;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const productId = getProductId(productToAdd);

      const productIndex = state.cartList.findIndex(
        (item) => getProductId(item) === productId
      );

      if (productIndex >= 0) {
        state.cartList[productIndex].qty += quantity;
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },

    decreaseQty: (state, action) => {
      const product = action.payload;
      const productId = getProductId(product);

      const productIndex = state.cartList.findIndex(
        (item) => getProductId(item) === productId
      );

      if (productIndex >= 0) {
        if (state.cartList[productIndex].qty > 1) {
          state.cartList[productIndex].qty -= 1;
        } else {
          state.cartList.splice(productIndex, 1);
        }
      }
    },

    deleteProduct: (state, action) => {
      const product = action.payload;
      const productId = getProductId(product);

      state.cartList = state.cartList.filter(
        (item) => getProductId(item) !== productId
      );
    },

    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

// ✅ Middleware to sync cart with localStorage per user
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    const userId = localStorage.getItem("userId");
    const cartKey = userId ? `cartList_${userId}` : "cartList_guest";
    localStorage.setItem(cartKey, JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
