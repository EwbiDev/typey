import { createSlice } from "@reduxjs/toolkit";
import { Dto } from "../../types/types";
import { submitNewPassage } from "./newPassageActions";

interface NewPassageState {
  loading: boolean;
  passage: Dto.Passage | null;
  error: Dto.ErrorResponse | undefined | null;
}

const initialState: NewPassageState = {
  loading: false,
  passage: null,
  error: null,
};

const newPassageSlice = createSlice({
  name: "newPassage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitNewPassage.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitNewPassage.fulfilled, (state, action) => {
        state.loading = false;
        state.passage = action.payload;
        state.error = null;
      })
      .addCase(submitNewPassage.rejected, (state, action) => {
        state.loading = false;
        state.passage = null;
        state.error = action.payload;
      });
  },
});

export default newPassageSlice.reducer;
