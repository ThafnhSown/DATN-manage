import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiLogin } from "../../api/services";

const initialState = {
    userInfo: null,
    isLogin: false,
    loading: false
};

export const requestLogin = createAsyncThunk('auth/login', async (props) => {
    const res = await apiLogin(props);
    return res.data
})

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        requestLogout: (state, action) => {
            state.userInfo = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestLogin.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.isLogin = true
            state.userInfo = action.payload.data;
        })
    }
});
export const authState = (state) => state.authState;

export const { loadUserInfo, requestLogout } = authSlice.actions;
export default authSlice.reducer;