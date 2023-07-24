import { configureStore } from "@reduxjs/toolkit";
import gistReducer from "./gists/gistSlice";

const reducer = {
  gists: gistReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: false,
});

export default store;
