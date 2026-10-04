import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUsersApi,
  getProfileApi,
  updateProfileApi,
  updateAvatarApi,
  updatePasswordApi,
} from '../api/userApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncGetUsers = createAsyncThunk('users/getAll', async (_, { rejectWithValue }) => {
  try {
    const res = await getUsersApi();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const asyncGetProfile = createAsyncThunk('users/getProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await getProfileApi();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const asyncUpdateProfile = createAsyncThunk(
  'users/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await updateProfileApi(profileData);
      showSuccessDialog('Profil berhasil diperbarui!');
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncUpdateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateAvatarApi(formData);
      showSuccessDialog('Foto profil berhasil diunggah!');
      dispatch(asyncGetProfile());
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncUpdatePassword = createAsyncThunk(
  'users/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      await updatePasswordApi(passwordData);
      showSuccessDialog('Kata sandi berhasil diganti!');
      return true;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);