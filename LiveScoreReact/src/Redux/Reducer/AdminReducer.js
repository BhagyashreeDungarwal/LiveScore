import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null,
}

const AdminSlice = createSlice({
    name: "Admin",
    initialState,
    reducers: {
        ClearMessageAdmin: (state) => {
            state.data = null,
                state.error = null,
                state.verifydata = null
        },
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

        //Post Category
        CategoryPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CategoryPostSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CategoryPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get By Id Category
        GetCategoryByIdStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetCategoryByIdSuccess: (state, action) => {
            state.loading = false;
            state.categoryByIddata = action.payload;
        },
        GetCategoryByIdFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Put Category
        CategoryPutStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        CategoryPutSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        CategoryPutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get Coordinator

        GetCoordinatorStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetCoordinatorSuccess: (state, action) => {
            state.loading = false;
            state.coordinatordata = action.payload;
        },
        GetCoordinatorFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get Tounament
        GetTounamentStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetTounamentSuccess: (state, action) => {
            state.loading = false;
            state.tounamentdata = action.payload;
        },
        GetTounamentFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Post Tounament
        TounamentPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        TounamentPostSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        TounamentPostFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get Tounament
        GetMatchStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        GetMatchSuccess: (state, action) => {
            state.loading = false;
            state.matchdata = action.payload;
        },
        GetMatchFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //Verify Coordinator
        VerifyCoordinatorStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        VerifyCoordinatorSuccess: (state, action) => {
            state.loading = false;
            state.verifydata = action.payload;
        },
        VerifyCoordinatorFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
})

export const { GetCategoryStart, GetCategorySuccess, GetCategoryFail, CategoryPostStart, CategoryPostSuccess, CategoryPostFail,
    GetCategoryByIdStart, GetCategoryByIdSuccess, GetCategoryByIdFail, CategoryPutStart, CategoryPutSuccess, CategoryPutFail,
    GetCoordinatorStart, GetCoordinatorSuccess, GetCoordinatorFail, GetTounamentStart, GetTounamentSuccess, GetTounamentFail,
    TounamentPostStart, TounamentPostSuccess, TounamentPostFail, VerifyCoordinatorFail, VerifyCoordinatorStart, VerifyCoordinatorSuccess, ClearMessageAdmin
} = AdminSlice.actions;
export default AdminSlice.reducer;