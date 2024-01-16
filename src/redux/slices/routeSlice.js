import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetListRoute} from "../../api/services";

const initialState = {
    loading: false,
    listRoute: [],
    currentRoute: {}
};

export const requestLoadListRoute = createAsyncThunk("/company/get-coach-route-list", async(companyId) => {
    const res = await apiGetListRoute(companyId)
    return res.data.data
})

export const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        setCurrentRoute: (state, action) => {
            state.currentRoute = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestLoadListRoute.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestLoadListRoute.fulfilled, (state, action) => {
            state.loading = false;
            state.listRoute = action.payload;
        })
    }
});

export const {
    setCurrentRoute
} = routeSlice.actions

export const routeState = (state) => state.routeState;

export default routeSlice.reducer;