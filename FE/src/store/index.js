import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";

// const userFormLocalStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

// const initialState = {
//   user :{ userInfo: userFormLocalStorage }
// }

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // preloadedState: initialState
})
