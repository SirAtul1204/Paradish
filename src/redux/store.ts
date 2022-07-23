import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./reducers/modalReducer";
import { toastReducer } from "./reducers/toastReducer";

const store = configureStore({
  reducer: {
    modalData: modalReducer,
    toastData: toastReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
