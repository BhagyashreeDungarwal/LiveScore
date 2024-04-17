import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null
}

const CoordinatorSlice = createSlice({
    name: "Coordinator",
    initialState,
    reducers: {

        // get Athelete

        GetAtheleteStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetAtheleteSuccess: (state, action) => {
            state.loading = false;
            state.atheletedata = action.payload;
        },
        GetAtheleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Post Athelete
        AtheletePostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        AtheletePostSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        AtheletePostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    },
})



export const { GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail, AtheletePostStart, AtheletePostSuccess, AtheletePostFail } = CoordinatorSlice.actions;
export default CoordinatorSlice.reducer;