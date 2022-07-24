import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./reducers/modalReducer";
import { toastReducer } from "./reducers/toastReducer";
import { userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    modalData: modalReducer,
    toastData: toastReducer,
    userData: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
