import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import PaymentSlice from "../slices/PaymentSlice";

export const Store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        paymentSlice: PaymentSlice,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ serializableCheck: false })
});