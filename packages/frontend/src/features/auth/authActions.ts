import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/types";

const instance = axios.create({
  baseURL: "/api/v1",
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: User.RegistrationFormData, thunkAPI) => {
    try {
      const response = await instance.post("/users", userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData: User.LoginFormData, thunkAPI) => {
    try {
      const response = await instance.post("/auth/login", loginData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);
