import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, PLAID_TOKEN } from "@/constants";
// import {setMessageHistory} from "./ChatSlice";
// import { useDispatch } from "react-redux";

const initialState = {
  token: localStorage.getItem(ACCESS_TOKEN) || null,
  plaid_token: localStorage.getItem(PLAID_TOKEN) || null,
  authUser: null,
};
const authSlice = createSlice({
  
  name: "auth",
  initialState,
  reducers: {
    SignIn: (state, action) => {
      state.token = action.payload;
      localStorage.setItem(ACCESS_TOKEN, action.payload);
    },
    SignOut: (state) => {
      state.token = null;
      localStorage.removeItem(ACCESS_TOKEN);
    },
    setPlaidToken: (state, action) => {
      state.plaid_token = action.payload;
      localStorage.setItem(PLAID_TOKEN, action.payload);
    },
    SetAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { SignIn, SignOut, SetAuthUser, setPlaidToken } = authSlice.actions;

export default authSlice.reducer;