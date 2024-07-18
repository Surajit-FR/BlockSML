import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import SubscriptionSlice from "../slices/SubscriptionSlice";

export const Store = configureStore({
    reducer: {
        authSlice: AuthSlice,
        subscriptionSlice: SubscriptionSlice,
    },
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({ serializableCheck: false })
});