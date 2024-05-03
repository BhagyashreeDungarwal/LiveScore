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
        },

        //GetById Athelete
        GetAtheleteByIdStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetAtheleteByIdSuccess: (state, action) => {
            state.loading = false;
            state.atheleteByIddata = action.payload;
        },
        GetAtheleteByIdFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Post Athelete
        AtheletePutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        AtheletePutSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        AtheletePutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //Post Coordinator
        CoordinatorPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CoordinatorPostSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CoordinatorPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //get Coordinator Profile Coordinator
        CoordinatorProfileStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CoordinatorProfileSuccess: (state, action) => {
            state.loading = false;
            state.cprofiledata = action.payload;
        },
        CoordinatorProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Update Coordinator Profile 
        CoordinatorProfileUpdateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CoordinatorProfileUpdateSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CoordinatorProfileUpdateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //Post Referee
        RefereePostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        RefereePostSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        RefereePostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //GEt Referee
        GetRefereeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetRefereetSuccess: (state, action) => {
            state.loading = false;
            state.refereedata = action.payload;
        },
        GetRefereeFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        //GEt Coach
        GetCoachStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetCoachtSuccess: (state, action) => {
            state.loading = false;
            state.coachdata = action.payload;
        },
        GetCoachFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Post Coach
        CoachPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CoachPostSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CoachPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },



    },
})



export const { GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail, AtheletePostStart, AtheletePostSuccess, AtheletePostFail,
    GetAtheleteByIdStart, GetAtheleteByIdSuccess, GetAtheleteByIdFail, AtheletePutStart, AtheletePutSuccess, AtheletePutFail,
    CoordinatorPostStart, CoordinatorPostSuccess, CoordinatorPostFail, RefereePostStart, RefereePostSuccess, RefereePostFail,
    GetRefereeStart, GetRefereetSuccess, GetRefereeFail, GetCoachStart, GetCoachtSuccess, GetCoachFail, CoachPostStart, CoachPostSuccess, CoachPostFail,
    CoordinatorProfileSuccess, CoordinatorProfileFail, CoordinatorProfileStart, CoordinatorProfileUpdateFail, CoordinatorProfileUpdateStart, CoordinatorProfileUpdateSuccess,

} = CoordinatorSlice.actions;
export default CoordinatorSlice.reducer;