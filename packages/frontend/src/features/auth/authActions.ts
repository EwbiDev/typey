import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Dto } from "../../types/types";

const instance = axios.create({
  baseURL: "/api/v1",
});

export const registerUser = createAsyncThunk<
  Dto.UserJwt,
  Dto.UserLogin,
  { rejectValue: Dto.ErrorResponse }
>("auth/register", async (userData: Dto.UserLogin, thunkAPI) => {
  try {
    const response = await instance.post("/users", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});

export const loginUser = createAsyncThunk<
  Dto.UserJwt,
  Dto.UserLogin,
  { rejectValue: Dto.ErrorResponse }
>("auth/login", async (loginData: Dto.UserLogin, thunkAPI) => {
  try {
    const response = await instance.post("/auth/login", loginData);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});

export const getCurrentUser = createAsyncThunk<
  Dto.UserJwt,
  void,
  { rejectValue: Dto.ErrorResponse }
>("auth/getCurrentUser", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken") ?? "";
    const response = await instance.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});
