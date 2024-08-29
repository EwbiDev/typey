import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LocationState = {
  currentPage?: string;
};

const initialState: LocationState = {
  currentPage: undefined,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = locationSlice.actions;
export default locationSlice.reducer;
