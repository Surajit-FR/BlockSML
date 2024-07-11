import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETSUBSPLANS, PAYMENTSUCCESS } from "../api/Api";
import { CustomHeadersType, PaymentSuccessParams } from "../../config/DataTypes";
import { EncryptData } from "../../helper/EncryptDecrypt";

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

// paymentSuccess thunk
export const paymentSuccess = createAsyncThunk("/user/api/v1/payment-success", async ({ _sessionID, header, navigate }: PaymentSuccessParams, { rejectWithValue }): Promise<any> => {
    try {
        const response = await PAYMENTSUCCESS({ _sessionID }, header);
        const result: any = response?.data;
        if (result?.success) {
            const user = EncryptData(result?.data);
            const token = EncryptData(result?.token);

            window.localStorage.setItem("token", token);
            window.localStorage.setItem("user", user);
            navigate("/pricing");
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