import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetListRoute, apiGetRouteDetail} from "../../api/services";

const initialState = {
    loading: false,
    listRoute: [],
    currentRoute: {},
    currentListPoint: []
};

export const requestLoadListRoute = createAsyncThunk("/company/get-coach-route-list", async(companyId) => {
    const res = await apiGetListRoute(companyId)
    return res.data.data
})

export const requestLoadPoint = createAsyncThunk("/company/get-route-detail", async(routeId) => {
    const res = await apiGetRouteDetail(routeId)
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
        builder.addCase(requestLoadPoint.fulfilled, (state, action) => {
            state.currentListPoint = action.payload.pointList
        })
    }
});

export const {
    setCurrentRoute
} = routeSlice.actions

export const routeState = (state) => state.routeState;

export default routeSlice.reducer;