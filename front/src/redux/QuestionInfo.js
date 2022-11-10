import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "questionInfo",
  initialState: {
    questionIndex: 0,
  },
  reducers: {
    SET_QUESTION_INDEX: (state, action) => {
      state.questionIndex = action.payload;
    },
  },
});

export const { SET_QUESTION_INDEX } = tokenSlice.actions;

export default tokenSlice.reducer;
