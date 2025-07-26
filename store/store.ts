import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./poll/authSlice";

const store = configureStore({
  reducer: {
    auth: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
