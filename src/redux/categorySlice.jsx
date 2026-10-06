  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unistoreSite from "../Helpers/helpers";
import urls from "../ApiUrls/urls";


export const getCategoryData = createAsyncThunk(
  "category/getCategoryData",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite
        .api()
        .get(urls.category);
      return resData.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    categoryError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryData.fulfilled, (state, action) => {
        state.categoryData = action.payload;
      })
  },
});

export default categorySlice.reducer;
