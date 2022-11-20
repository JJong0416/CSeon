import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "workbookInfo",
  initialState: {
    workbookIndex: 0,
    workbookTitle: "",
  },
  reducers: {
    SET_WORKBOOK_INDEX: (state, action) => {
      state.workbookIndex = action.payload;
    },
    SET_WORKBOOK_TITLE: (state, action) => {
      state.workbookTitle = action.payload;
    },
  },
});

export const { SET_WORKBOOK_INDEX, SET_WORKBOOK_TITLE } = tokenSlice.actions;

export default tokenSlice.reducer;
