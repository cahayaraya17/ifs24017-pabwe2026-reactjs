import { createSlice } from '@reduxjs/toolkit';
import {
  asyncGetUsers,
  asyncGetProfile,
  asyncUpdateProfile,
  asyncUpdateAvatar,
  asyncUpdatePassword,
} from './action';

const initialState = {
  users: [],
  profile: null,
  isProfile: false,
  isChangeProfile: false,
  isChangeProfilePhoto: false,
  isChangeProfilePassword: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.users = action.payload;
        } else if (action.payload && Array.isArray(action.payload.users)) {
          state.users = action.payload.users;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          state.users = action.payload.data;
        } else {
          state.users = [];
        }
      })
      .addCase(asyncGetUsers.rejected, (state, action) => {
        state.users = [];
        state.error = action.payload;
      })
      .addCase(asyncGetProfile.pending, (state) => {
        state.isProfile = true;
      })
      .addCase(asyncGetProfile.fulfilled, (state, action) => {
        state.isProfile = false;
        state.profile = action.payload?.user || action.payload?.data || action.payload;
      })
      .addCase(asyncGetProfile.rejected, (state, action) => {
        state.isProfile = false;
        state.error = action.payload;
      })
      .addCase(asyncUpdateProfile.pending, (state) => {
        state.isChangeProfile = true;
      })
      .addCase(asyncUpdateProfile.fulfilled, (state, action) => {
        state.isChangeProfile = false;
        state.profile = {
          ...state.profile,
          ...(action.payload?.user || action.payload?.data || action.payload),
        };
      })
      .addCase(asyncUpdateProfile.rejected, (state) => {
        state.isChangeProfile = false;
      })
      .addCase(asyncUpdateAvatar.pending, (state) => {
        state.isChangeProfilePhoto = true;
      })
      .addCase(asyncUpdateAvatar.fulfilled, (state) => {
        state.isChangeProfilePhoto = false;
      })
      .addCase(asyncUpdateAvatar.rejected, (state) => {
        state.isChangeProfilePhoto = false;
      })
      .addCase(asyncUpdatePassword.pending, (state) => {
        state.isChangeProfilePassword = true;
      })
      .addCase(asyncUpdatePassword.fulfilled, (state) => {
        state.isChangeProfilePassword = false;
      })
      .addCase(asyncUpdatePassword.rejected, (state) => {
        state.isChangeProfilePassword = false;
      });
  },
});

export default usersSlice.reducer;