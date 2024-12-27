import { configureStore } from "@reduxjs/toolkit";
import { gitHubReducer } from "./slice";

export const store = configureStore({
  reducer: {
    gitHubData: gitHubReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch