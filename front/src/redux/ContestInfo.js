import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "contestInfo",
  initialState: {
    contestId: 1,
    contestName: "",
  },
  reducers: {
    SET_CONTEST_ID: (state, action) => {
      state.contestId = action.payload;
    },
    SET_CONTEST_NAME: (state, action) => {
      state.contestName = action.payload;
    },
  },
});

export const { SET_CONTEST_ID, SET_CONTEST_NAME } = tokenSlice.actions;

export default tokenSlice.reducer;
