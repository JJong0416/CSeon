import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "contestInfo",
  initialState: {
    contestId: 1,
    contestName: "",
    contestEndTime: "",
  },
  reducers: {
    SET_CONTEST_ID: (state, action) => {
      state.contestId = action.payload;
    },
    SET_CONTEST_NAME: (state, action) => {
      state.contestName = action.payload;
    },
    SET_CONTEST_ENDTIME: (state, action) => {
      state.contestEndTime = action.payload;
    },
  },
});

export const { SET_CONTEST_ID, SET_CONTEST_NAME, SET_CONTEST_ENDTIME } =
  tokenSlice.actions;

export default tokenSlice.reducer;
