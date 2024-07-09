import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import UtilitySlice from "../slices/UtilitySlice";

export const Store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        utilitySlice: UtilitySlice,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ serializableCheck: false })
});