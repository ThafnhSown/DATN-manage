import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetListProvince } from "../../api/services";

const initialState = {
    loading: false,
    listProvince: [],
    listDistrict: [],
};

export const requestLoadProvince = createAsyncThunk('global/province', async () => {
    const res = await apiGetListProvince()
    const listP = res.data.data.map((p) => ({
        value: p.id,
        label: p.province
    }))
    return listP
})

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(requestLoadProvince.fulfilled, (state, action) => {
            state.listProvince = action.payload
        })
    }
});

export const globalState = (state) => state.globalState;

export default globalSlice.reducer;