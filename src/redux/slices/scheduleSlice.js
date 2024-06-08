import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateSchedule, apiListSchedule } from "../../api/services";

const initialState = {
    loading: false,
    listSchedule: [],
    currentTimeslot: {}
};

export const requestCreateSchedule = createAsyncThunk("/company/create-coach-schedule", async(props) => {
    const res = await apiCreateSchedule(props)
    return res.data.data
})

export const requestLoadSchedule = createAsyncThunk("/company/get-coach-schedule-list", async(id) => {
    const res = await apiListSchedule(id)
    return res.data.data
})


export const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        addSchedule: (state, action) => {
           state.listSchedule = [...state.listSchedule, action.payload]

        },
        onSetCurentTimeslot: (state, action) => {
            state.currentTimeslot = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestCreateSchedule.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestCreateSchedule.fulfilled, (state, action) => {
            state.loading = false
            state.listSchedule.push(action.payload)
        })
        builder.addCase(requestLoadSchedule.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestLoadSchedule.fulfilled, (state, action) => {
            state.loading = false
            state.listSchedule = action.payload
        })
    }
});

export const {
    addSchedule,
    onSetCurentTimeslot
} = scheduleSlice.actions

export const scheduleState = (state) => state.scheduleState;

export default scheduleSlice.reducer;