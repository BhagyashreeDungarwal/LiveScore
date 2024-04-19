import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Reducer/loginReducer";
import CoordinatorSlice from "./Reducer/CoordinatorReducer";
import AdminSlice from "./Reducer/AdminReducer";

const rootReducer = combineReducers({
    login: loginSlice,
    coordinator: CoordinatorSlice,
    admin: AdminSlice

})

export default rootReducer;