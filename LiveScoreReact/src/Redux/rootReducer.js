import { combineReducers } from "@reduxjs/toolkit";
import  loginSlice  from "./Reducer/loginReducer";

const rootReducer = combineReducers({
login : loginSlice
})

export default rootReducer;