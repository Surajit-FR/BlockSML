import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETSUBSPLANS } from "../api/Api";
import { CustomHeadersType } from "../../config/DataTypes";

// getSubsPlans thunk
export const getSubsPlans = createAsyncThunk("/user/api/get-subscription-plans", async (header: CustomHeadersType, { rejectWithValue }): Promise<any> => {
    try {
        const response = await GETSUBSPLANS(header);
        const result: any = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

const PaymentSlice = createSlice({
    name: "paymentSlice",
    initialState: {
        subsPlan_data: [],

        // Common States
        utility_loading: false,
        error: null,
    },
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // getSubsPlans states
        builder.addCase(getSubsPlans.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(getSubsPlans.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const subsPlan_data: any = payload?.data;
            state.subsPlan_data = subsPlan_data;
        })
        builder.addCase(getSubsPlans.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
})


export const {
    clearError,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;