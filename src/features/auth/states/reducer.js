import { createSlice } from '@reduxjs/toolkit';
import {
  asyncRegister,
  asyncLogin,
  asyncLogout,
} from './action';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: Boolean(localStorage.getItem('token')),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        const token = action.payload?.token || action.payload?.access_token;
        state.token = token;
        state.isAuthenticated = true;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(asyncLogout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;