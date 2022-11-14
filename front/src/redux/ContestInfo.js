import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "contestInfo",
  initialState: {
    contestId: 1,
  },
  reducers: {
    SET_CONTEST_ID: (state, action) => {
      state.contestId = action.payload;
    },
  },
});

export const { SET_CONTEST_ID } = tokenSlice.actions;

export default tokenSlice.reducer;
