import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PollProps } from "@/types/db";

const initialState: PollProps[] = [];

const pollSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    setPolls: (state, action: PayloadAction<PollProps[]>) => {
      const newPolls = action.payload;
      newPolls.forEach((element) => {
        state.push(element);
      });
    },
  },
});

export const { setPolls } = pollSlice.actions;
export default pollSlice.reducer;
