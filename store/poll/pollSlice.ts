import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PollProps } from "@/types/db";

const initialState: PollProps[] = [];

const pollSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    setPolls: (_state, action: PayloadAction<PollProps[]>) => action.payload,
  },
});

export const { setPolls } = pollSlice.actions;
export default pollSlice.reducer;
