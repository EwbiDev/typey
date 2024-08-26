import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./authActions";
import { User } from "../../types/types";

const accessToken = localStorage.getItem("accessToken") || null;

interface LoginState {
  loading: boolean;
  user: User.CurrentUser | null | undefined;
  accessToken: string | null;
  error: User.RegistrationErrorResponse | null;
}

const initialState: LoginState = {
  loading: true,
  user: undefined,
  accessToken,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { userId, username, accessToken } = action.payload;

        state.loading = false;
        state.user = { userId, username };
        state.accessToken = accessToken;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        const { userId, username } = action.payload;

        state.loading = false;
        state.user = { userId, username };
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
