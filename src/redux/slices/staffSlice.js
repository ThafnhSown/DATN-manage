import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateStaff, apiGetStaff} from "../../api/services";

const initialState = {
    loading: false,
    currentStaff: {},
    listStaff: []
};

export const requestLoadStaff = createAsyncThunk('/company/get-list-staff', async (id) => {
    const res = await apiGetStaff(id);
    return res.data.data
})

export const requestCreateStaff = createAsyncThunk("/company/create-staff", async(props) => {
    const res = await apiCreateStaff(props)
    return res.data
})

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        setCurrentStaff: (state, action) => {
            state.currentStaff = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestCreateStaff.fulfilled, (state, action) => {
            state.listStaff.push(action.payload)
        })

        builder.addCase(requestLoadStaff.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLoadStaff.fulfilled, (state, action) => {
            state.loading = false;
            state.listStaff = action.payload?.content
        })
    }
});
export const {
    setCurrentStaff
} = staffSlice.actions

export const staffState = (state) => state.staffState;

export default staffSlice.reducer;