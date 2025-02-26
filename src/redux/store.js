import { configureStore } from "@reduxjs/toolkit";
import ReduxSlice from "./redux-slice"

export const store = configureStore({
  reducer: {
    auth: ReduxSlice,
  },
});
