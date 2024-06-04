import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: null,
}

const url = "http://localhost:5032/api"

export const LoginApi = createAsyncThunk(
    'Login/login',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/Login/Login`, values, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const FindEmailApi = createAsyncThunk(
    'Login/FindEmail',
    async (email, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/ACR/FindEmail/${email}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const LoginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        clearMessageLogin: (state) => {
            state.error = null,
                state.data = null

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginApi.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(LoginApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(LoginApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(FindEmailApi.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(FindEmailApi.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(FindEmailApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {clearMessageLogin}  = LoginSlice.actions;
export default LoginSlice.reducer;