import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { thingsToBuySlice } from "./thingstobuy";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    thingsToBuySlice: thingsToBuySlice.reducer
  },
});
