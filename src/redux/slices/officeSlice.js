import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateOffice, apiDeleteRoute, apiListOffice} from "../../api/services";

const initialState = {
    loading: false,
    listOffice: [],
    currentOffice: null
};

export const requestDeleteRoute = createAsyncThunk("/company/delete-coach-route", async(props) => {
    const res = await apiDeleteRoute(props)
    return res.data.data
})

export const requestLoadListOffice = createAsyncThunk("/company/get-company-office-list", async(companyId) => {
    const res = await apiListOffice(companyId)
    return res.data.data
})

export const requestCreateOffice = createAsyncThunk("/company/create-company-office", async(props) => {
    const res = await apiCreateOffice(props)
    return res.data
})

export const officeSlice = createSlice({
    name: "office",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(requestCreateOffice.fulfilled, (state, action) => {
            state.listOffice.push(action.payload)
        })
        builder.addCase(requestLoadListOffice.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestLoadListOffice.fulfilled, (state, action) => {
            state.loading = false;
            state.listOffice = action.payload
        })
    }
});

export const officeState = (state) => state.officeState;

export default officeSlice.reducer;