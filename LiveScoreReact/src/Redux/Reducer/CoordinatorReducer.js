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
        // for Clear All Message
        clearMessage: (state) => {
            state.error = null,
                state.data = null

        },
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

        //Put Athelete
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

        //Put athlete image Athelete
        AtheletePutPicStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        AtheletePutPicSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        AtheletePutPicFail: (state, action) => {
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
        //Update Coordinator Profile picture
        CoordinatorProfileUpdatePicStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CoordinatorProfileUpdatePicSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CoordinatorProfileUpdatePicFail: (state, action) => {
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
        //Block Referee
        BlockRefereeStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        BlockRefereeSuccess: (state, action) => {
            state.loading = false;
            state.verifydata = action.payload;
        },
        BlockRefereeFail: (state, action) => {
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
        //GetById Coach
        GetCoachByIdStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetCoachByIdSuccess: (state, action) => {
            state.loading = false;
            state.coachByIddata = action.payload;
        },
        GetCoachByIdFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Put Coach
        CoachPutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CoachPutSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CoachPutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Block Coach
        BlockCoachStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        BlockCoachSuccess: (state, action) => {
            state.loading = false;
            state.verifydata = action.payload;
        },
        BlockCoachFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
})



export const { GetAtheleteStart, GetAtheleteSuccess, GetAtheleteFail, AtheletePostStart, AtheletePostSuccess, AtheletePostFail,
    GetAtheleteByIdStart, GetAtheleteByIdSuccess, GetAtheleteByIdFail, AtheletePutStart, AtheletePutSuccess, AtheletePutFail, AtheletePutPicStart,
    AtheletePutPicSuccess, AtheletePutPicFail, CoordinatorPostStart, CoordinatorPostSuccess, CoordinatorPostFail, RefereePostStart, RefereePostSuccess,
    RefereePostFail, GetRefereeStart, GetRefereetSuccess, GetRefereeFail, BlockRefereeStart, BlockRefereeSuccess, BlockRefereeFail, GetCoachStart,
    GetCoachtSuccess, GetCoachFail, CoachPostStart, CoachPostSuccess, CoachPostFail, CoordinatorProfileSuccess, CoordinatorProfileFail, CoordinatorProfileStart, CoordinatorProfileUpdateFail,
    CoordinatorProfileUpdateStart, CoordinatorProfileUpdateSuccess, CoordinatorProfileUpdatePicStart, CoordinatorProfileUpdatePicSuccess, CoordinatorProfileUpdatePicFail,
    GetCoachByIdStart, GetCoachByIdSuccess, GetCoachByIdFail, CoachPutStart, CoachPutSuccess, CoachPutFail, BlockCoachStart, BlockCoachSuccess, BlockCoachFail,
    clearMessage,
} = CoordinatorSlice.actions;
export default CoordinatorSlice.reducer;