import { configureStore } from "@reduxjs/toolkit";
import { editModalReducer } from "./reducers/EditModalReducer";
import { modalReducer } from "./reducers/modalReducer";
import { toastReducer } from "./reducers/toastReducer";

const store = configureStore({
  reducer: {
    modalData: modalReducer,
    toastData: toastReducer,
    editModalData: editModalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
