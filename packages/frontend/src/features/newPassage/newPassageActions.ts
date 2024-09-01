import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Dto } from "../../types/types";

const instance = axios.create({
  baseURL: "/api/v1",
});

export const submitNewPassage = createAsyncThunk<
  Dto.Passage,
  Dto.NewPassage,
  { rejectValue: Dto.ErrorResponse }
>("newPassage/submit", async (passageData: Dto.NewPassage, thunkAPI) => {
  try {
    const response = await instance.post("/passages", passageData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
});
