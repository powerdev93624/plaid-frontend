import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goal: null,
  messageHistory: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
    setMessageHistory: (state, action) => {
      state.messageHistory = action.payload;
    },
  },
});

export const { setGoal, setMessageHistory } = chatSlice.actions;

export default chatSlice.reducer;
