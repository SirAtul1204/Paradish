import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../Utils/interface";

const userSlice = createSlice({
  name: "user",
  initialState: {} as IUser,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = undefined;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
