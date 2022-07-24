import { createSlice } from "@reduxjs/toolkit";
import { IModal } from "../../Utils/interface";

const modalSlice = createSlice({
  name: "slice",
  initialState: {
    isOpen: false,
    status: "info",
    title: "Modal Title",
    message: "Modal Message",
  } as IModal,
  reducers: {
    openModal: (
      state,
      action: {
        type: string;
        payload: {
          title: IModal["title"];
          message: IModal["message"];
          status: IModal["status"];
        };
      }
    ) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
