import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../../helpers/apiHelper', () => ({
  fetchWithAuth: vi.fn().mockResolvedValue({}),
}));

import { fetchWithAuth } from '../../../helpers/apiHelper';
import * as api from './lostFoundApi';

describe('lostFoundApi', () => {
  beforeEach(() => fetchWithAuth.mockClear());

  it('getLostFoundsApi membangun query string dan mengabaikan nilai kosong', async () => {
    await api.getLostFoundsApi({ status: 'lost', q: '', x: null });
    expect(fetchWithAuth).toHaveBeenCalledWith('/lost-founds?status=lost');
    await api.getLostFoundsApi();
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds');
    await api.getLostFoundsApi(null);
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds');
  });

  it('endpoint lain', async () => {
    await api.getDetailLostFoundApi(1);
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds/1');
    await api.addLostFoundApi({ a: 1 });
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds', { method: 'POST', body: '{"a":1}' });
    await api.updateLostFoundApi(2, { a: 1 });
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds/2', { method: 'PUT', body: '{"a":1}' });
    await api.deleteLostFoundApi(3);
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds/3', { method: 'DELETE' });
    const fd = new FormData();
    await api.uploadCoverLostFoundApi(4, fd);
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds/4/cover', { method: 'POST', body: fd });
    await api.getDailyStatsApi();
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds/stats/daily');
    await api.getMonthlyStatsApi();
    expect(fetchWithAuth).toHaveBeenLastCalledWith('/lost-founds/stats/monthly');
  });
});