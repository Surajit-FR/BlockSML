import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADDCATEGORY } from "../api/Api";
import { CategoryOperationResponse, FormValues_Props } from "../../config/DataTypes.config";

// addCategory thunk
export const addCategory = createAsyncThunk("/admin/api/add/new/category", async ({ data, page, pageSize, header }: FormValues_Props, { rejectWithValue, dispatch }): Promise<CategoryOperationResponse | any> => {
    try {
        const response = await ADDCATEGORY(data, header);
        const result: CategoryOperationResponse = response?.data;
        if (result?.success) {
            return result
        };
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

const UtilitySlice = createSlice({
    name: "utilitySlice",
    initialState: {
        category_data: [],

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
        // addCategory states
        builder.addCase(addCategory.pending, (state) => {
            state.utility_loading = true;
        })
        builder.addCase(addCategory.fulfilled, (state, { payload }) => {
            state.utility_loading = false;
            const category_data: any = payload;
            state.category_data = category_data;
        })
        builder.addCase(addCategory.rejected, (state, { payload }) => {
            state.utility_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
})


export const {
    clearError,
} = UtilitySlice.actions;
export default UtilitySlice.reducer;