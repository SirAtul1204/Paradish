import { createSlice } from "@reduxjs/toolkit";

interface TEditModalState {
  isOpen: boolean;
  content: string;
  val: string;
  inputType: "text" | "number" | "email" | "password" | "file";
  handleSave: string;
}

const initialState: TEditModalState = {
  isOpen: false,
  content: "",
  val: "",
  inputType: "text",
  handleSave: "",
};

const EditModalSlice = createSlice({
  name: "editModal",
  initialState,
  reducers: {
    openEditModal: (state) => {
      state.isOpen = true;
    },
    updateEditModal: (
      state,
      action: {
        type: string;
        payload: {
          content: string;
          val: string;
          inputType?: "text" | "number" | "email" | "password" | "file";
          handleSave?: string;
        };
      }
    ) => {
      state.content = action.payload.content;
      state.val = action.payload.val;
      state.inputType = action.payload.inputType ?? "text";
      if (action.payload.handleSave)
        state.handleSave = action.payload.handleSave;
    },
    closeEditModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openEditModal, updateEditModal, closeEditModal } =
  EditModalSlice.actions;
export const editModalReducer = EditModalSlice.reducer;
