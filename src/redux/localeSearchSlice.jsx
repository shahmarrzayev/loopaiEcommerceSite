import { createSlice } from "@reduxjs/toolkit";
import { allProductsData } from "../localeDatas/datas"; 

const searchSlice = createSlice({
  name: "search",

  initialState: {
    searchResultData: [],
    searchError: null,
  },

  reducers: {
    searchProduct: (state, action) => {
      const word = action.payload?.trim().toLocaleLowerCase("az");

      if (!word) {
        state.searchResultData = [];
        return;
      }

      const allProducts = Object.values(allProductsData).flatMap(
        (category) => category.products || []
      );

      state.searchResultData = allProducts.filter((product) => {
        const title =
          product.title?.toLocaleLowerCase("az") || "";

        const description =
          product.description?.toLocaleLowerCase("az") || "";

        const productType =
          product.productType?.toLocaleLowerCase("az") || "";

        return (
          title.includes(word) ||
          description.includes(word) ||
          productType.includes(word)
        );
      });

      state.searchError = null;
    },

    clearSearch: (state) => {
      state.searchResultData = [];
      state.searchError = null;
    },
  },
});

export const {
  searchProduct,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;