// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../ult/types/types";
import { authApi } from "./authApi"; // Import your authApi

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User }>
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  // Add extraReducers to handle RTK Query actions
  extraReducers: (builder) => {
    builder
      // Handle successful getCurrentUser query
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchFulfilled,
        (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.loading = false;
        }
      )
      // Handle pending getCurrentUser query
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchPending,
        (state) => {
          state.loading = true;
        }
      )
      // Handle failed getCurrentUser query
      .addMatcher(
        authApi.endpoints.getCurrentUser.matchRejected,
        (state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.loading = false;
        }
      )
      // Handle successful login
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action) => {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.loading = false;
        }
      )
      // Handle successful logout
      .addMatcher(
        authApi.endpoints.logout.matchFulfilled,
        (state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.loading = false;
        }
      )
      // Handle failed logout (still clear local state)
      .addMatcher(
        authApi.endpoints.logout.matchRejected,
        (state) => {
          state.user = null;
          state.isAuthenticated = false;
          state.loading = false;
        }
      );
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;