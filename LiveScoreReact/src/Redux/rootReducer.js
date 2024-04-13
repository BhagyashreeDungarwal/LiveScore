import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Reducer/loginReducer";
import CoordinatorSlice from "./Reducer/CoordinatorReducer";

const rootReducer = combineReducers({
    login: loginSlice,
    coordinator: CoordinatorSlice

})

export default rootReducer;