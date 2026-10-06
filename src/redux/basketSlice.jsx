import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unistoreSite from "../Helpers/helpers";
import urls from "../ApiUrls/urls";

export const getAllBasketData = createAsyncThunk(
  "basket/allBasketDatas",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().get(urls.allBasketData);
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  },
);

export const addToBasketProduct = createAsyncThunk(
  "basket/addProduct",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().post(urls.addToBasketProduct, {
        productId,
        quantity,
      });
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const decrementFunc = createAsyncThunk(
  "basket/decrement",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().put(urls.decrementCount, {
        productId,
        quantity,
      });
      return resData.data;
    } catch (error) {
      rejectWithValue(error.response.data || error.message);
    }
  },
);

export const deletedBasketProductFunc = createAsyncThunk(
  "deleted/basketProduct",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite
        .api()
        .put(urls.deletedBasketProduct, { productId, quantity });
      return resData.data;
    } catch (error) {
      rejectWithValue(error.response.data || error.message);
    }
  },
);

export const incrementFunc = createAsyncThunk(
  "basket/increment",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().post(urls.incrementCount, {
        productId,
        quantity,
      });
      return resData.data;
    } catch (error) {
      rejectWithValue(error.response.data || error.message);
    }
  },
);

export const allBasketProductsRemove = createAsyncThunk(
  "basket/allBasketProducts",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().put(urls.allBasketProductRemove);
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  },
);

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketData: [],
    basketErrorMessage: null,
    basketLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBasketData.pending, (state) => {
        state.basketLoading = true;
      })
      .addCase(getAllBasketData.fulfilled, (state, action) => {
        state.basketLoading = false;
        state.basketData = action.payload;
      })
      .addCase(getAllBasketData.rejected, (state, action) => {
        state.basketLoading = false;
        state.basketErrorMessage = action.payload;
      })
      .addCase(addToBasketProduct.fulfilled, (state, action) => {
        state.basketData = action.payload;
      })
      .addCase(addToBasketProduct.rejected, (state, action) => {
        state.basketErrorMessage = action.payload;
      })
      .addCase(decrementFunc.fulfilled, (state, action) => {
        state.basketData = action.payload;
      })
      .addCase(decrementFunc.rejected, (state, action) => {
        state.basketErrorMessage = action.payload;
      })
      .addCase(incrementFunc.fulfilled, (state, action) => {
        state.basketData = action.payload;
      })
      .addCase(incrementFunc.rejected, (state, action) => {
        state.basketErrorMessage = action.payload;
      })
      .addCase(deletedBasketProductFunc.fulfilled, (state, action) => {
        state.basketData = action.payload;
      })
      .addCase(deletedBasketProductFunc.rejected, (state, action) => {
        state.basketErrorMessage = action.payload;
      })
      .addCase(allBasketProductsRemove.fulfilled, (state, action) => {
        state.basketData = action.payload;
      });
  },
});

export default basketSlice.reducer;
