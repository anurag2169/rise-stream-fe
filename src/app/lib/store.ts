import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "../lib/features/videos/videoSlice";
import userReducer from "../lib/features/user/userSlice";

// Define a type for the root state
export type RootState = ReturnType<typeof store.getState>;

// Define a type for the dispatch function
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    videoReducer,
    user: userReducer,
  },
});
