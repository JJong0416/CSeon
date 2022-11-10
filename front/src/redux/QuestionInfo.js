import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "questionInfo",
  initialState: {
    questionIndex: 0,
    questionId: 0,
    requestquestionId: 0,
  },
  reducers: {
    SET_QUESTION_INDEX: (state, action) => {
      state.questionIndex = action.payload;
    },
    SET_QUESTION_ID: (state, action) => {
      state.questionId = action.payload;
    },
    SET_REQUEST_QUESTION_ID: (state, action) => {
      state.requestquestionId = action.payload;
    },
  },
});

export const { SET_QUESTION_INDEX, SET_QUESTION_ID, SET_REQUEST_QUESTION_ID } =
  tokenSlice.actions;

export default tokenSlice.reducer;
