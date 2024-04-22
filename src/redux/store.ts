import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import boardsReducer from "./boardsSlice";

const rootReducer = combineReducers({
  boards: boardsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
