import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "./Reducer/loginReducer.js";

const rootReducer = combineReducers({
login : loginSlice
})

export default rootReducer;