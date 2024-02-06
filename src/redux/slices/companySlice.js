import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateCompany, apiCreatePolicy, apiGetCoachList, apiGetCompanyInfo, apiGetListCompany, apiGetPolicyList } from "../../api/services";

const initialState = {
    loading: false,
    currentCompany: {},
    listCompany: [],
    listCoach: [],
    listPolicy: [],
    mapCoach: {}
};

export const requestLoadCompany = createAsyncThunk('admin/get-list-company', async () => {
    const res = await apiGetListCompany();
    return res.data.data
})

export const requestCompanyInfo = createAsyncThunk('/company/get-info', async() => {
    const res = await apiGetCompanyInfo()
    return res.data.data
})

export const requestCreateCompany = createAsyncThunk("/admin/create-company-account", async(props) => {
    const res = await apiCreateCompany(props)
    return res.data
})

export const requestLoadCoach = createAsyncThunk("/company/get-coach-list", async(id) => {
    const res = await apiGetCoachList(id)
    return res.data.data
})

export const requestLoadPolicy = createAsyncThunk("/company/get-policy-list", async(id) => {
    const res = await apiGetPolicyList(id)
    return res.data.data
})

export const requestCreatePolicy = createAsyncThunk("/company/create-policy", async (props) => {
    const res = await apiCreatePolicy(props)
    return res.data.data
})

export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCurrentCompany: (state, action) => {
            state.currentCompany = action.payload
        },
        setCurrentListCoach: (state, action) => {
            state.listCoach = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestCreateCompany.fulfilled, (state, action) => {
            state.listCompany.push(action.payload)
        })

        builder.addCase(requestLoadCompany.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(requestLoadCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.listCompany = action.payload?.content
        })
        builder.addCase(requestCompanyInfo.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(requestCompanyInfo.fulfilled, (state, action) => {
            state.loading = false
            state.currentCompany = action.payload
        })
        builder.addCase(requestLoadCoach.fulfilled, (state, action) => {
            state.loading = false;
            state.listCoach = action.payload
            // action.payload.map(coach => state.mapCoach[coach.id] = coach)
        })
        builder.addCase(requestLoadPolicy.fulfilled, (state, action) => {
            state.loading = false
            state.listPolicy = action.payload
        })
        builder.addCase(requestCreatePolicy.fulfilled, (state, action) => {
            state.listPolicy = [...state.listPolicy, action.payload]
        })
    }
});
export const {
    setCurrentCompany,
    setCurrentListCoach
} = companySlice.actions

export const companyState = (state) => state.companyState;

export default companySlice.reducer;