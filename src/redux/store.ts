import { configureStore } from "@reduxjs/toolkit";

import heroes from "./heroes/slice";
import filters from "./filters/slice";

const store = configureStore({
  reducer: {
    heroes,
    filters,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootStateType = ReturnType<typeof store.getState>;

export default store;
