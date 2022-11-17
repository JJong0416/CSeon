import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "accountInfo",
  initialState: {
    accessToken: null,
    accountInfo: {
      accountRole: null,
      accountName: null,
    },
    loggedIn: false,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.accessToken = action.payload;
    },
    SET_ACCOUNT_INFO: (state, action) => {
      state.accountInfo = action.payload;
    },
    SET_LOGIN: (state) => {
      state.loggedIn = true;
    },
    SET_LOGOUT: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { SET_TOKEN, SET_ACCOUNT_INFO, SET_LOGIN, SET_LOGOUT } =
  tokenSlice.actions;

export default tokenSlice.reducer;
