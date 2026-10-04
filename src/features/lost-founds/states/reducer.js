import { createSlice } from '@reduxjs/toolkit';
import {
  asyncGetLostFounds,
  asyncGetDetailLostFound,
  asyncAddLostFound,
  asyncUpdateLostFound,
  asyncDeleteLostFound,
  asyncUploadCoverLostFound,
  asyncGetDailyStats,
} from './action';

const initialState = {
  lostFounds: [],
  lostFound: null,
  isLostFound: false,
  isLostFoundAdd: false,
  isLostFoundChange: false,
  isLostFoundChangeCover: false,
  isLostFoundDelete: false,
  lostFoundStats: null,
  error: null,
};

const lostFoundSlice = createSlice({
  name: 'lostFounds',
  initialState,
  reducers: {
    clearDetailLostFound: (state) => {
      state.lostFound = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLostFounds.pending, (state) => {
        state.isLostFound = true;
        state.error = null;
      })
      .addCase(asyncGetLostFounds.fulfilled, (state, action) => {
        state.isLostFound = false;
        if (Array.isArray(action.payload)) {
          state.lostFounds = action.payload;
        } else if (action.payload && Array.isArray(action.payload.lost_founds)) {
          state.lostFounds = action.payload.lost_founds;
        } else if (action.payload && Array.isArray(action.payload.items)) {
          state.lostFounds = action.payload.items;
        } else {
          state.lostFounds = [];
        }
      })
      .addCase(asyncGetLostFounds.rejected, (state, action) => {
        state.isLostFound = false;
        state.error = action.payload;
        state.lostFounds = [];
      })
      .addCase(asyncGetDetailLostFound.pending, (state) => {
        state.isLostFound = true;
      })
      .addCase(asyncGetDetailLostFound.fulfilled, (state, action) => {
        state.isLostFound = false;
        state.lostFound = action.payload?.lost_found || action.payload;
      })
      .addCase(asyncGetDetailLostFound.rejected, (state, action) => {
        state.isLostFound = false;
        state.error = action.payload;
      })
      .addCase(asyncAddLostFound.pending, (state) => {
        state.isLostFoundAdd = true;
      })
      .addCase(asyncAddLostFound.fulfilled, (state) => {
        state.isLostFoundAdd = false;
      })
      .addCase(asyncAddLostFound.rejected, (state) => {
        state.isLostFoundAdd = false;
      })
      .addCase(asyncUpdateLostFound.pending, (state) => {
        state.isLostFoundChange = true;
      })
      .addCase(asyncUpdateLostFound.fulfilled, (state) => {
        state.isLostFoundChange = false;
      })
      .addCase(asyncUpdateLostFound.rejected, (state) => {
        state.isLostFoundChange = false;
      })
      .addCase(asyncUploadCoverLostFound.pending, (state) => {
        state.isLostFoundChangeCover = true;
      })
      .addCase(asyncUploadCoverLostFound.fulfilled, (state) => {
        state.isLostFoundChangeCover = false;
      })
      .addCase(asyncUploadCoverLostFound.rejected, (state) => {
        state.isLostFoundChangeCover = false;
      })
      .addCase(asyncDeleteLostFound.pending, (state) => {
        state.isLostFoundDelete = true;
      })
      .addCase(asyncDeleteLostFound.fulfilled, (state) => {
        state.isLostFoundDelete = false;
      })
      .addCase(asyncDeleteLostFound.rejected, (state) => {
        state.isLostFoundDelete = false;
      })
      .addCase(asyncGetDailyStats.fulfilled, (state, action) => {
        state.lostFoundStats = action.payload;
      });
  },
});

export const { clearDetailLostFound } = lostFoundSlice.actions;
export default lostFoundSlice.reducer;