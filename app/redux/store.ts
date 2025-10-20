import { configureStore } from "@reduxjs/toolkit";
import basicDetailsReducer from "./slices/basicDetails";
const store = configureStore({
  reducer: {
    basicDetails: basicDetailsReducer, // 👈 use reducer here
  },

});

export type RootState = ReturnType<typeof store.getState>;

export default store;
