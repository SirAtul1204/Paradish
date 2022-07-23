import { createSlice } from "@reduxjs/toolkit";
import { IToast } from "../../Utils/interface";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    isOpen: true,
    status: "info",
    message: "Toast Message",
  } as IToast,
  reducers: {
    openToast(state, action) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    closeToast(state) {
      state.isOpen = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
