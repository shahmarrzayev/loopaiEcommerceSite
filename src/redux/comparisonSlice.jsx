import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unistoreSite from "../Helpers/helpers";
import urls from "../ApiUrls/urls";

export const addComparisonProduct = createAsyncThunk(
  "comparison/addProduct",
  async ({ productId }, { rejectWithValue, dispatch }) => {
    try {
      const resData = await unistoreSite
        .api()
        .post(urls.addProductComparison(productId));
      dispatch(getComparisonData());
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const deletedComparisonProductFunc = createAsyncThunk(
  "comparison/deleteProduct",
  async ({ productId }, { rejectWithValue, dispatch }) => {
    try {
      const resData = await unistoreSite
        .api()
        .delete(urls.removeProductComparison(productId));
         dispatch(getComparisonData());
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getComparisonData = createAsyncThunk(
  "comparison/allData",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().get(urls.allComparison);
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getCategoryCompareData = createAsyncThunk(
  "comparison/getCategoryData",
  async ({ categoryId }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite
        .api()
        .get(urls.getCategoryCompareDatas(categoryId));
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getComparisonPrLength = createAsyncThunk(
  "comparison/getComparisonPrLength",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite
        .api()
        .post(urls.comparisonProductLength);
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const comparisonSlice = createSlice({
  name: "comparison",
  initialState: {
    comparisonData: [],
    comparisonErrorMessage: null,
    comparisonLoading: false,

    selectedCategoryData: null,
    selectedCategoryLoading: false,
    selectedCategoryError: null,

    comparisonPrLength: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComparisonData.pending, (state) => {
        state.comparisonLoading = true;
        state.comparisonErrorMessage = null;
      })
      .addCase(getComparisonData.fulfilled, (state, action) => {
        state.comparisonLoading = false;
        state.comparisonData = action.payload;
        if (!action.payload || action.payload.length === 0) {
          state.selectedCategoryData = null;
        }
      })
      .addCase(getComparisonData.rejected, (state, action) => {
        state.comparisonLoading = false;
        state.comparisonErrorMessage = action.payload;
      })

      .addCase(addComparisonProduct.fulfilled, (state, action) => {
        state.comparisonPrLength = { length: action.payload?.totalCount ?? action.payload?.length ?? action.payload?.count ?? (typeof action.payload === 'number' ? action.payload : 0) };
      })
      .addCase(addComparisonProduct.rejected, (state, action) => {
        state.comparisonErrorMessage = action.payload;
      })

      .addCase(deletedComparisonProductFunc.fulfilled, (state, action) => {
        state.comparisonPrLength = { length: action.payload?.totalCount ?? action.payload?.length ?? action.payload?.count ?? (typeof action.payload === 'number' ? action.payload : 0) };
      })
      .addCase(deletedComparisonProductFunc.rejected, (state, action) => {
        state.comparisonErrorMessage = action.payload;
      })

      .addCase(getCategoryCompareData.pending, (state) => {
        state.selectedCategoryLoading = true;
        state.selectedCategoryError = null;
      })
      .addCase(getCategoryCompareData.fulfilled, (state, action) => {
        state.selectedCategoryLoading = false;
        state.selectedCategoryData = action.payload;
      })
      .addCase(getCategoryCompareData.rejected, (state, action) => {
        state.selectedCategoryLoading = false;
        state.selectedCategoryError = action.payload;
      })
      .addCase(getComparisonPrLength.fulfilled, (state, action) => {
        state.comparisonPrLength = { length: action.payload?.totalCount ?? action.payload?.length ?? action.payload?.count ?? (typeof action.payload === 'number' ? action.payload : 0) };
      })
  },
});

export default comparisonSlice.reducer;
