import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import locationReducer from "../features/location/locationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
