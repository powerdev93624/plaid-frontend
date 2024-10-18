import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggled: false,
  isLoginDrawer: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsToggled: (state, action) => {
      state.isToggled = action.payload;
    },
    setIsLoginDrawer: (state, action) => {
      state.isLoginDrawer = action.payload;
    },
  },
});

export const { setIsToggled, setIsLoginDrawer } = appSlice.actions;

export default appSlice.reducer;
