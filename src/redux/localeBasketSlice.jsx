import { createSlice } from "@reduxjs/toolkit";

const getBasketFromLocalStorage = () => {
  try {
    const basket = localStorage.getItem("localeBasket");
    return basket ? JSON.parse(basket) : [];
  } catch (error) {
    console.error("Basket localStorage error:", error);
    return [];
  }
};

const saveBasketToLocalStorage = (basketData) => {
  try {
    localStorage.setItem("localeBasket", JSON.stringify(basketData));
  } catch (error) {
    console.error("Basket localStorage save error:", error);
  }
};

const initialState = {
  localeBasketData: getBasketFromLocalStorage(),
  basketErrorMessage: null,
  basketLoading: false,
};

const localeBasketSlice = createSlice({
  name: "localeBasket",
  initialState,

  reducers: {
    addToBasketProduct: (state, action) => {
      const product = action.payload;

      const existingProduct = state.localeBasketData.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.localeBasketData.push({
          ...product,
          quantity: 1,
        });
      }
  
      saveBasketToLocalStorage(state.localeBasketData);
    },

    incrementFunc: (state, action) => {
      const productId = action.payload;

      const product = state.localeBasketData.find(
        (item) => item.id === productId
      );

      if (product) {
        product.quantity += 1;
      }

      saveBasketToLocalStorage(state.localeBasketData);
    },

    decrementFunc: (state, action) => {
      const productId = action.payload;

      const product = state.localeBasketData.find(
        (item) => item.id === productId
      );

      if (!product) return;

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.localeBasketData = state.localeBasketData.filter(
          (item) => item.id !== productId
        );
      }

      saveBasketToLocalStorage(state.localeBasketData);
    },

    deletedBasketProductFunc: (state, action) => {
      const productId = action.payload;

      state.localeBasketData = state.localeBasketData.filter(
        (item) => item.id !== productId
      );

      saveBasketToLocalStorage(state.localeBasketData);
    },

    allBasketProductsRemove: (state) => {
      state.localeBasketData = [];

      localStorage.removeItem("localeBasket");
    },
  },
});

export const {
  addToBasketProduct,
  incrementFunc,
  decrementFunc,
  deletedBasketProductFunc,
  allBasketProductsRemove,
} = localeBasketSlice.actions;

export default localeBasketSlice.reducer;