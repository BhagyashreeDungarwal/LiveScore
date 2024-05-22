import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:5032/api"
import axios from "axios"


export const AthletePostApi = createAsyncThunk(
    'athlete/post',
    async (values, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/Athletes/PostAthlete`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const initialState = {
    data: [],
    loading: false,
    error: null,
    blockData: null,
    verifyData: null
}

const CoordinatorSlice = createSlice({
    name: "coordinator",
    initialState,
    reducers: {
        // for Clear All Message
        clearMessage: (state) => {
            state.error = null,
                state.data = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase
    }

})