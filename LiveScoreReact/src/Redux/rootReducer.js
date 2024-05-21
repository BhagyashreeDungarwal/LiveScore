import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./Reducer/loginReducer";
import CoordinatorSlice from "./Reducer/CoordinatorReducer";
import AdminRedux from "./AdminRedux";
// import AdminSlice from "./Reducer/AdminReducer";

const rootReducer = combineReducers({
    login: loginSlice,
    coordinator: CoordinatorSlice,
    admin: AdminRedux

})

export default rootReducer;