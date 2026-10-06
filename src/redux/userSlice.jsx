import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import unistoreSite from "../Helpers/helpers";
import urls from "../ApiUrls/urls";


const initialState = {
  authMeUser: {},
  isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
};
   
// user auth me
export const authMe = createAsyncThunk(
  "user/authMe",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await  unistoreSite.api().get(urls.userMe);
      return resData.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Xəta baş verdi");
    }
  }
);
 
// user login
export const login = createAsyncThunk(
  "user/login",  
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().post(urls.login, data);
      if (resData.data.success) {
        localStorage.setItem("isLogin", true);
        dispatch(authMe());
        return true;
      }
      throw new Error("Gözlənilməz login xətası");
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.data.error || "Xəta baş verdi");
    }
  }
);

// user logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const resData = await unistoreSite.api().post(urls.logout);
      localStorage.removeItem("isLogin");
      return resData.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Xəta baş verdi");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authMe.fulfilled, (state, action) => {
        state.isLogin = true;
        state.authMeUser = action.payload;
      })
      .addCase(authMe.rejected, (state) => {
        state.isLogin = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLogin = false;
      });
  },
});

export default userSlice.reducer;
