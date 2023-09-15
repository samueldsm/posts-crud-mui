import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import postReducer from "./slices/post/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counterId: counterIdState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
