import { createAsyncThunk } from '@reduxjs/toolkit';
import { postRegisterApi, postLoginApi } from '../api/authApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncRegister = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await postRegisterApi(userData);
      showSuccessDialog('Registrasi berhasil! Silakan masuk.');
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncLogin = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await postLoginApi(credentials);
      const token = res.data?.token || res.data?.access_token;
      if (token) {
        localStorage.setItem('token', token);
      }
      showSuccessDialog('Berhasil masuk!');
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncLogout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  showSuccessDialog('Berhasil keluar!');
  return null;
});