import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unistoreSite from "../Helpers/helpers";
import urls from "../ApiUrls/urls";
   

export const getWishlistData = createAsyncThunk(
    "allWishlistData",
  async  ( _, {rejectWithValue}) => {
        try {
          const resData = await unistoreSite.api().get(urls.allWishlistData);
            return resData.data
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
)

export const addWishlistProduct = createAsyncThunk(
  "addWishlist",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite
        .api()
        .post(urls.addWishlist(productId));
      return resData.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  },
);
 
export const deletedWishlistProduct = createAsyncThunk(
    "deletedWishlist",
    async ({ productId }, { rejectWithValue}) => {
        try {
        const resData = await unistoreSite
          .api()
            .delete(urls.removeWishList(productId));
            return resData.data
        } catch (error) {
         return rejectWithValue(error.response.data || error.message)
        }
    }
)

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistData: [],
        wishlistErrorMessage: null,
        wishlistLoading:false
    },
    extraReducers: (builder) => {
      builder
        .addCase(getWishlistData.pending, (state) => {
          state.wishlistLoading = true;
        })
        .addCase(getWishlistData.fulfilled, (state, action) => {
          state.wishlistLoading = false;
          state.wishlistData = action.payload;
        })
        .addCase(getWishlistData.rejected, (state, action) => {
           state.wishlistLoading = false;
          state.wishlistErrorMessage = action.payload;
        })
        .addCase(addWishlistProduct.fulfilled, (state, action) => {
          state.wishlistData = action.payload;
        })
        .addCase(addWishlistProduct.rejected, (state, action) => {
          state.wishlistErrorMessage = action.payload;
        })
        .addCase(deletedWishlistProduct.fulfilled, (state, action) => {
          state.wishlistData = action.payload;
        })
        .addCase(deletedWishlistProduct.rejected, (state, action) => {
          state.wishlistErrorMessage = action.payload;
        });
    }
})

export default wishlistSlice.reducer

