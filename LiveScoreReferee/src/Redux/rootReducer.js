import { combineReducers } from "@reduxjs/toolkit";
import LoginRedux from "./LoginRedux";

const rootReducer = combineReducers({
    login: LoginRedux,

})

export default rootReducer;