import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appSlice from "./slices/AppSlice";
import authSlice from "./slices/AuthSlice";
import chatSlice from "./slices/ChatSlice";

const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  chat: chatSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
