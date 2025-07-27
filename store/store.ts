import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./poll/authSlice";
import pollReducer from "./poll/pollSlice";

const store = configureStore({
  reducer: {
    auth: sessionReducer,
    polls: pollReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
