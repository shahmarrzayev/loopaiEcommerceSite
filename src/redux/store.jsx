import { configureStore } from "@reduxjs/toolkit";
import category from "./categorySlice";
import basket from "./basketSlice";
import search from "./searchSlice";
import localeBasket from "./localeBasketSlice";
import localeSearch from "./localeSearchSlice"

export const store = configureStore({
  reducer: {
    categoryStore: category,
    basketStore: basket, 
    searchStore: search,
    localeBasketStore:localeBasket,
    localeSerachStore:localeSearch
  },
});
