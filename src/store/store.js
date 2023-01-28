import { configureStore } from "@reduxjs/toolkit";
import appConfigSlice from "./slices/appConfigSlice";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";

export const store= configureStore({
    reducer: {
        appConfigSlice,
        userSlice,
        postSlice
    }
})