import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthState } from "@/types";

const initialState: AuthState = {
  session: null,
  loading: false,
  error: null,
};

export const initializeSession = createAsyncThunk(
  "auth/initializeSession",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      supabase.auth.onAuthStateChange((_event, session) => {
        dispatch(setSession(session));
      });

      return session;
    } catch (err) {
      return rejectWithValue("Failed to initialize session");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeSession.fulfilled, (state, action) => {
        state.session = action.payload;
        state.loading = false;
      })
      .addCase(initializeSession.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
