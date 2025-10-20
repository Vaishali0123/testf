import { createSlice } from "@reduxjs/toolkit";

// const getTab=sessionStorage.getItem("tab")
const getTab="tab"
const initialState = {
  data: {
   tab:getTab?getTab:"tab"
  },
};

// Slice
const basicSlice = createSlice({
  name: "basicDetails",
  initialState,
  reducers: {
    setBasicdata: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const { setBasicdata } = basicSlice.actions;

export default basicSlice.reducer;
