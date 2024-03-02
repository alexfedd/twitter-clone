import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducers/authSlice';
import windowReducer from "./reducers/windowSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        window: windowReducer
    }
})