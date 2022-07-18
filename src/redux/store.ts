import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./reducers/modalReducer";

const store = configureStore({
  reducer: {
    modalData: modalReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
