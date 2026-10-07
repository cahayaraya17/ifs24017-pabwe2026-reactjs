import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../api/authApi', () => ({
  postRegisterApi: vi.fn(),
  postLoginApi: vi.fn(),
}));
vi.mock('../../../helpers/toolsHelper', () => ({
  showSuccessDialog: vi.fn(),
  showErrorDialog: vi.fn(),
}));

import reducer, { setUser, clearAuth } from './reducer';
import { asyncRegister, asyncLogin, asyncLogout } from './action';
import { postRegisterApi, postLoginApi } from '../api/authApi';
import { showErrorDialog } from '../../../helpers/toolsHelper';

const makeStore = () => configureStore({ reducer: { auth: reducer } });

describe('auth state', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('reducer: setUser & clearAuth', () => {
    const store = makeStore();
    store.dispatch(setUser({ name: 'A' }));
    expect(store.getState().auth.user).toEqual({ name: 'A' });
    expect(store.getState().auth.isAuthenticated).toBe(true);
    localStorage.setItem('token', 't');
    store.dispatch(clearAuth());
    expect(store.getState().auth.isAuthenticated).toBe(false);
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('asyncRegister sukses', async () => {
    postRegisterApi.mockResolvedValue({ data: { id: 1 } });
    const store = makeStore();
    const res = await store.dispatch(asyncRegister({ name: 'x' }));
    expect(res.payload).toEqual({ id: 1 });
    expect(store.getState().auth.isLoading).toBe(false);
  });

  it('asyncRegister gagal', async () => {
    postRegisterApi.mockRejectedValue(new Error('dupe'));
    const store = makeStore();
    await store.dispatch(asyncRegister({}));
    expect(store.getState().auth.error).toBe('dupe');
    expect(showErrorDialog).toHaveBeenCalledWith('dupe');
  });

  it('asyncLogin sukses menyimpan token (token / access_token)', async () => {
    postLoginApi.mockResolvedValueOnce({ data: { token: 'T1' } });
    const store = makeStore();
    await store.dispatch(asyncLogin({}));
    expect(localStorage.getItem('token')).toBe('T1');
    expect(store.getState().auth.token).toBe('T1');
    expect(store.getState().auth.isAuthenticated).toBe(true);

    postLoginApi.mockResolvedValueOnce({ data: { access_token: 'T2' } });
    await store.dispatch(asyncLogin({}));
    expect(localStorage.getItem('token')).toBe('T2');
  });

  it('asyncLogin tanpa token tidak menyimpan apa pun', async () => {
    postLoginApi.mockResolvedValue({ data: {} });
    const store = makeStore();
    await store.dispatch(asyncLogin({}));
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('asyncLogin gagal', async () => {
    postLoginApi.mockRejectedValue(new Error('salah'));
    const store = makeStore();
    await store.dispatch(asyncLogin({}));
    expect(store.getState().auth.error).toBe('salah');
    expect(store.getState().auth.isLoading).toBe(false);
  });

  it('asyncLogout menghapus token', async () => {
    localStorage.setItem('token', 'x');
    const store = makeStore();
    await store.dispatch(asyncLogout());
    expect(localStorage.getItem('token')).toBeNull();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});