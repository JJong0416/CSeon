import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "userInfo",
  initialState: {
    accessToken: null,
    userInfo: {
      userName: null,
      userNick: null,
      userPhone: null,
      userSeq: null,
    },
    loggedIn: false,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.accessToken = action.payload;
    },
    SET_USERINFO: (state, action) => {
      state.userInfo = action.payload;
    },
    SET_LOGIN: (state) => {
      state.loggedIn = true;
    },
    SET_LOGOUT: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { SET_TOKEN, SET_USERINFO, SET_LOGIN, SET_LOGOUT } =
  tokenSlice.actions;

export default tokenSlice.reducer;
