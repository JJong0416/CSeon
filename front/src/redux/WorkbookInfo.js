import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "workbookInfo",
  initialState: {
    workbookIndex: 0,
  },
  reducers: {
    SET_WORKBOOK_INDEX: (state, action) => {
      state.workbookIndex = action.payload;
    },
  },
});

export const { SET_WORKBOOK_INDEX } = tokenSlice.actions;

export default tokenSlice.reducer;
