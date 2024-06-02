import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./features/userSlices.js";

export const store = configureStore({
  reducer: userSlices,
});
