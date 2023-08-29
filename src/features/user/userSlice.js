import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../supabase";

const initialState = {};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const getUser = (state) => state.user.user;
export default userSlice.reducer;
