import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateMediaContent, apiGetListNews, apiGetMediaContent } from "../../api/services";

const initialState = {
    mapMainBanner: {},
    mapSubBanner: {},
    currentNews: {},
    listNews: []
};

export const requestLoadNews = createAsyncThunk('api/global/get-news-feed', async () => {
    const res = await apiGetListNews();
    return res.data.data
})
export const requestCreateBanner = createAsyncThunk('/api/admin/create-media-content', async(props) => {
    const res = await apiCreateMediaContent(props)
    return res.data.data
})

export const requestLoadMainBanner = createAsyncThunk("/api/admin/get-main-media-content", async (type) => {
    const res = await apiGetMediaContent(type)
    return res.data.data
})

export const requestLoadSubBanner = createAsyncThunk("/api/admin/get-sub-media-content", async (type) => {
    const res = await apiGetMediaContent(type)
    return res.data.data
})


export const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setCurrentNews: (state, action) => {
            state.currentNews = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(requestLoadNews.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLoadNews.fulfilled, (state, action) => {
            state.loading = false;
            state.listNews = action.payload.content
        })

        builder.addCase(requestCreateBanner.fulfilled, (state, action) => {
            const banner = action.payload
            if(banner.type == 1) {
                state.mapMainBanner[banner.id] = banner
            } else if(banner.type == 0) {
                state.mapSubBanner[banner.id] = banner
            }
        })
        builder.addCase(requestLoadMainBanner.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLoadMainBanner.fulfilled, (state,action) => {
            state.loading = false;
            action.payload.map(e => {
                state.mapMainBanner[e.id] = e
            })
        })
        builder.addCase(requestLoadSubBanner.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLoadSubBanner.fulfilled, (state,action) => {
            state.loading = false;
            state.subBanner = action.payload
        })
    }
});
export const {
    setCurrentNews
} = newsSlice.actions

export const newsState = (state) => state.newsState;

export default newsSlice.reducer;