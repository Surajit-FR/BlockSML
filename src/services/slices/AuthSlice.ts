import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN, UPDATETHEME } from "../api/Api";
import { FormValues_Props, AuthResponse, UserAuth_Props } from "../../config/DataTypes.config";
import { EncryptData } from "../../helper/EncryptDecrypt";

// loginUser thunk
export const loginUser = createAsyncThunk("/api/login", async ({ data, navigate }: UserAuth_Props, { rejectWithValue }): Promise<AuthResponse | any> => {
    try {
        const response = await LOGIN(data);
        const result: AuthResponse = response?.data;
        if (result?.success) {
            const user = EncryptData(result?.data);
            window.localStorage.setItem("token", JSON.stringify(result?.token));
            window.localStorage.setItem("user", user);
            navigate("/");
            return result;
        }
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

// updateTheme thunk
export const updateTheme = createAsyncThunk("/api/update/theme", async ({ data, header }: FormValues_Props, { rejectWithValue }): Promise<AuthResponse | any> => {
    try {
        const response = await UPDATETHEME(data, header);
        const result: AuthResponse = response?.data;
        if (result?.success) {
            const user = EncryptData(result?.data);
            window.localStorage.setItem("token", JSON.stringify(result?.token));
            window.localStorage.setItem("user", user);
            return result;
        }
    } catch (exc: any) {
        const err: any = rejectWithValue(exc.response.data);
        return err;
    }
});

const AuthSlice = createSlice({
    name: "authSlice",
    initialState: {
        user_data: [],
        auth_loading: false,
        update_theme_resp: null,
        error: null
    },
    reducers: {
        logoutUser(state, { payload }) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('user');
            state.user_data = [];
            payload('/admin/signin');
        },
        clearAuthError(state) {
            state.error = null;
        },
        clearUpdateThemeResp(state) {
            state.update_theme_resp = null;
        },
    },
    extraReducers: builder => {
        // loginUser states
        builder.addCase(loginUser.pending, (state) => {
            state.auth_loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.auth_loading = false;
            const user_data: any = payload;
            state.user_data = user_data;
        })
        builder.addCase(loginUser.rejected, (state, { payload }) => {
            state.auth_loading = false;
            const err: any | null = payload;
            state.error = err;
        })

        // updateTheme states
        builder.addCase(updateTheme.pending, (state) => {
            state.auth_loading = true;
        })
        builder.addCase(updateTheme.fulfilled, (state, { payload }) => {
            state.auth_loading = false;
            const update_theme_resp: any = payload;
            state.update_theme_resp = update_theme_resp;
        })
        builder.addCase(updateTheme.rejected, (state, { payload }) => {
            state.auth_loading = false;
            const err: any | null = payload;
            state.error = err;
        })
    }
})


export const { logoutUser, clearAuthError, clearUpdateThemeResp } = AuthSlice.actions;
export default AuthSlice.reducer;