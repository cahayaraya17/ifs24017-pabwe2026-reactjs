import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../api/lostFoundApi', () => ({
  getLostFoundsApi: vi.fn(),
  getDetailLostFoundApi: vi.fn(),
  addLostFoundApi: vi.fn(),
  updateLostFoundApi: vi.fn(),
  deleteLostFoundApi: vi.fn(),
  uploadCoverLostFoundApi: vi.fn(),
  getDailyStatsApi: vi.fn(),
}));
vi.mock('../../../helpers/toolsHelper', () => ({
  showSuccessDialog: vi.fn(),
  showErrorDialog: vi.fn(),
}));

import reducer, { clearDetailLostFound } from './reducer';
import * as act from './action';
import * as api from '../api/lostFoundApi';

const makeStore = () => configureStore({ reducer: { lostFounds: reducer } });
const s = (store) => store.getState().lostFounds;

describe('lostFounds state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    api.getLostFoundsApi.mockResolvedValue({ data: [] });
    api.getDailyStatsApi.mockResolvedValue({ data: { total: 1 } });
    api.getDetailLostFoundApi.mockResolvedValue({ data: { id: 1 } });
  });

  it.each([
    [[{ id: 1 }], 1],
    [{ lost_founds: [{ id: 1 }] }, 1],
    [{ items: [{ id: 1 }] }, 1],
    [{ foo: 1 }, 0],
    [null, 0],
  ])('asyncGetLostFounds mengnormalisasi payload %j', async (payload, len) => {
    api.getLostFoundsApi.mockResolvedValue({ data: payload });
    const store = makeStore();
    await store.dispatch(act.asyncGetLostFounds({ status: 'lost' }));
    expect(s(store).lostFounds).toHaveLength(len);
    expect(s(store).isLostFound).toBe(false);
  });

  it('asyncGetLostFounds rejected', async () => {
    api.getLostFoundsApi.mockRejectedValue(new Error('err'));
    const store = makeStore();
    await store.dispatch(act.asyncGetLostFounds());
    expect(s(store).error).toBe('err');
    expect(s(store).lostFounds).toEqual([]);
  });

  it('detail: fulfilled (nested & flat), rejected, dan clear', async () => {
    const store = makeStore();
    api.getDetailLostFoundApi.mockResolvedValueOnce({ data: { lost_found: { id: 9 } } });
    await store.dispatch(act.asyncGetDetailLostFound(9));
    expect(s(store).lostFound).toEqual({ id: 9 });
    api.getDetailLostFoundApi.mockResolvedValueOnce({ data: { id: 5 } });
    await store.dispatch(act.asyncGetDetailLostFound(5));
    expect(s(store).lostFound).toEqual({ id: 5 });
    store.dispatch(clearDetailLostFound());
    expect(s(store).lostFound).toBeNull();
    api.getDetailLostFoundApi.mockRejectedValueOnce(new Error('nf'));
    await store.dispatch(act.asyncGetDetailLostFound(1));
    expect(s(store).error).toBe('nf');
  });

  it('add/update/delete/upload sukses', async () => {
    const store = makeStore();
    api.addLostFoundApi.mockResolvedValue({ data: { id: 1 } });
    api.updateLostFoundApi.mockResolvedValue({ data: {} });
    api.deleteLostFoundApi.mockResolvedValue({});
    api.uploadCoverLostFoundApi.mockResolvedValue({ data: {} });
    expect((await store.dispatch(act.asyncAddLostFound({}))).payload).toEqual({ id: 1 });
    await store.dispatch(act.asyncUpdateLostFound({ id: 1, data: {} }));
    expect((await store.dispatch(act.asyncDeleteLostFound(1))).payload).toBe(1);
    await store.dispatch(act.asyncUploadCoverLostFound({ id: 1, formData: new FormData() }));
    expect(s(store).isLostFoundAdd).toBe(false);
    expect(s(store).isLostFoundChange).toBe(false);
    expect(s(store).isLostFoundDelete).toBe(false);
    expect(s(store).isLostFoundChangeCover).toBe(false);
    expect(s(store).lostFoundStats).toEqual({ total: 1 });
  });

  it('add/update/delete/upload gagal', async () => {
    const store = makeStore();
    const e = new Error('x');
    api.addLostFoundApi.mockRejectedValue(e);
    api.updateLostFoundApi.mockRejectedValue(e);
    api.deleteLostFoundApi.mockRejectedValue(e);
    api.uploadCoverLostFoundApi.mockRejectedValue(e);
    for (const r of [
      await store.dispatch(act.asyncAddLostFound({})),
      await store.dispatch(act.asyncUpdateLostFound({ id: 1, data: {} })),
      await store.dispatch(act.asyncDeleteLostFound(1)),
      await store.dispatch(act.asyncUploadCoverLostFound({ id: 1, formData: null })),
    ]) {
      expect(r.payload).toBe('x');
    }
    expect(s(store).isLostFoundAdd).toBe(false);
    expect(s(store).isLostFoundDelete).toBe(false);
  });

  it('asyncGetDailyStats gagal mengembalikan rejectWithValue', async () => {
    api.getDailyStatsApi.mockRejectedValue(new Error('s'));
    const store = makeStore();
    const r = await store.dispatch(act.asyncGetDailyStats());
    expect(r.payload).toBe('s');
  });
});