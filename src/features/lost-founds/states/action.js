import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getLostFoundsApi,
  getDetailLostFoundApi,
  addLostFoundApi,
  updateLostFoundApi,
  deleteLostFoundApi,
  uploadCoverLostFoundApi,
  getDailyStatsApi,
} from '../api/lostFoundApi';
import { showSuccessDialog, showErrorDialog } from '../../../helpers/toolsHelper';

export const asyncGetLostFounds = createAsyncThunk(
  'lostFounds/getAll',
  async (queryParams, { rejectWithValue }) => {
    try {
      const res = await getLostFoundsApi(queryParams);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const asyncGetDetailLostFound = createAsyncThunk(
  'lostFounds/getDetail',
  async (id, { rejectWithValue }) => {
    try {
      const res = await getDetailLostFoundApi(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const asyncAddLostFound = createAsyncThunk(
  'lostFounds/add',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await addLostFoundApi(data);
      showSuccessDialog('Laporan berhasil ditambahkan!');
      dispatch(asyncGetLostFounds());
      dispatch(asyncGetDailyStats());
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncUpdateLostFound = createAsyncThunk(
  'lostFounds/update',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateLostFoundApi(id, data);
      showSuccessDialog('Laporan berhasil diperbarui!');
      dispatch(asyncGetLostFounds());
      dispatch(asyncGetDetailLostFound(id));
      dispatch(asyncGetDailyStats());
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncDeleteLostFound = createAsyncThunk(
  'lostFounds/delete',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteLostFoundApi(id);
      showSuccessDialog('Laporan berhasil dihapus!');
      dispatch(asyncGetLostFounds());
      dispatch(asyncGetDailyStats());
      return id;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncUploadCoverLostFound = createAsyncThunk(
  'lostFounds/uploadCover',
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      const res = await uploadCoverLostFoundApi(id, formData);
      showSuccessDialog('Cover berhasil diperbarui!');
      dispatch(asyncGetDetailLostFound(id));
      return res.data;
    } catch (err) {
      showErrorDialog(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const asyncGetDailyStats = createAsyncThunk(
  'lostFounds/getDailyStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getDailyStatsApi();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);