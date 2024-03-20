import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateCoach, apiCreateCompany, apiCreatePolicy, apiGetCoachList, apiGetCompanyInfo, apiGetListCompany, apiGetListOrder, apiGetPolicyList } from "../../api/services";

const initialState = {
    loading: false,
    currentCompany: {},
    listCompany: [],
    listCoach: [],
    listPolicy: [],
    listOrder: []
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

export const requestCreateCoach = createAsyncThunk("/company/create-transport", async (payload) => {
    const res = await apiCreateCoach(payload)
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

export const requestLoadOrder = createAsyncThunk("/company/list-order", async(props) => {
    const res = await apiGetListOrder(props)
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
        },
        deleteCoach: (state, action) => {
            const id = action.payload
            const tmp = state.listCoach.filter(item => item.id != id)
            state.listCoach = tmp
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
        builder.addCase(requestCreateCoach.pending, (state) => {
            state.loading = true
        })
        builder.addCase(requestCreateCoach.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(requestLoadCoach.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(requestLoadCoach.fulfilled, (state, action) => {
            state.loading = false;
            state.listCoach = action.payload
        })
        builder.addCase(requestLoadPolicy.fulfilled, (state, action) => {
            state.loading = false
            state.listPolicy = action.payload
        })
        builder.addCase(requestCreatePolicy.fulfilled, (state, action) => {
            state.listPolicy = [...state.listPolicy, action.payload]
        })
        builder.addCase(requestLoadOrder.fulfilled, (state, action) => {
            state.listOrder = action.payload
        })
    }
});
export const {
    setCurrentCompany,
    setCurrentListCoach,
    deleteCoach
} = companySlice.actions

export const companyState = (state) => state.companyState;

export default companySlice.reducer;