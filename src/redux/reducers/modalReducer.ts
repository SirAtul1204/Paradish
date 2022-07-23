import { createSlice } from "@reduxjs/toolkit";
import { IModal } from "../../Utils/interface";

const modalSlice = createSlice({
  name: "slice",
  initialState: {
    isOpen: true,
    status: "info",
    title: "Modal Title",
    message: "Modal Message",
  } as IModal,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.message = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
