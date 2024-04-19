import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null
}

const AdminSlice = createSlice({
    name: "Admin",
    initialState,
    reducers: {
        // get Category

        GetCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetCategorySuccess: (state, action) => {
            state.loading = false;
            state.categorydata = action.payload;
        },
        GetCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { GetCategoryStart, GetCategorySuccess, GetCategoryFail } = AdminSlice.actions;
export default AdminSlice.reducer;