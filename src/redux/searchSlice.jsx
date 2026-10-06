import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unistoreSite from "../Helpers/helpers";
import urls from "../ApiUrls/urls";


export const getSearchProduct = createAsyncThunk(
  "search/searchProductFunc",
  async ({ word, page, perPage = 10 }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite
        .api()
        .get(`${urls.search(word)}&page=${page}&perPage=24`);
      return resData.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data); 
    }
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResultData: null,
    searchError: null,
    searchLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchProduct.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(getSearchProduct.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResultData = action.payload;
      })
      .addCase(getSearchProduct.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export default searchSlice.reducer;
