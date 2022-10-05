import { createSlice } from "@reduxjs/toolkit";

const EditModalSlice = createSlice({
  name: "editModal",
  initialState: {
    isOpen: false,
    content: "",
    val: "",
  },
  reducers: {
    openEditModal: (state) => {
      state.isOpen = true;
    },
    updateModal: (
      state,
      action: {
        type: string;
        payload: {
          content: string;
          val: string;
        };
      }
    ) => {
      state.content = action.payload.content;
      state.val = action.payload.val;
    },
  },
});

export const { openEditModal, updateModal } = EditModalSlice.actions;
export const editModalReducer = EditModalSlice.reducer;
