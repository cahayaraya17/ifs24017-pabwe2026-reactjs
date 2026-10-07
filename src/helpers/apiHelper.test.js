import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import apiHelper, { fetchWithAuth, getAuthToken, get, post, put, del } from './apiHelper';

const mockResponse = (body, ok = true) => ({
  ok,
  json: () => Promise.resolve(body),
});

describe('apiHelper', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it('getAuthToken mengembalikan token atau string kosong', () => {
    expect(getAuthToken()).toBe('');
    localStorage.setItem('token', 'abc');
    expect(getAuthToken()).toBe('abc');
  });

  it('menambahkan header Authorization dan Content-Type JSON', async () => {
    localStorage.setItem('token', 'abc');
    fetch.mockResolvedValue(mockResponse({ ok: 1 }));
    await fetchWithAuth('/x', { method: 'POST', body: '{}' });
    const [url, opts] = fetch.mock.calls[0];
    expect(url).toContain('/x');
    expect(opts.headers.Authorization).toBe('Bearer abc');
    expect(opts.headers['Content-Type']).toBe('application/json');
  });

  it('tidak memasang Content-Type untuk FormData dan menerima URL absolut / tanpa slash', async () => {
    fetch.mockResolvedValue(mockResponse({}));
    await fetchWithAuth('https://example.com/a', { method: 'POST', body: new FormData() });
    expect(fetch.mock.calls[0][0]).toBe('https://example.com/a');
    expect(fetch.mock.calls[0][1].headers['Content-Type']).toBeUndefined();
    expect(fetch.mock.calls[0][1].headers.Authorization).toBeUndefined();
    await fetchWithAuth('tanpa-slash');
    expect(fetch.mock.calls[1][0]).toMatch(/\/tanpa-slash$/);
  });

  it('melempar error dengan pesan dari server', async () => {
    fetch.mockResolvedValue(mockResponse({ message: 'Gagal!' }, false));
    await expect(fetchWithAuth('/x')).rejects.toThrow('Gagal!');
  });

  it('melempar pesan default jika respons bukan JSON', async () => {
    fetch.mockResolvedValue({ ok: false, json: () => Promise.reject(new Error('x')) });
    await expect(fetchWithAuth('/x')).rejects.toThrow('Terjadi kesalahan pada permintaan');
  });

  it('helper get/post/put/del memakai method yang benar', async () => {
    fetch.mockResolvedValue(mockResponse({}));
    await get('/a');
    await post('/a', { a: 1 });
    await put('/a', { a: 1 });
    await del('/a');
    await post('/a', new FormData());
    await put('/a', new FormData());
    expect(fetch.mock.calls.map((c) => c[1].method)).toEqual(['GET', 'POST', 'PUT', 'DELETE', 'POST', 'PUT']);
    expect(fetch.mock.calls[1][1].body).toBe('{"a":1}');
    expect(apiHelper.delete).toBe(del);
  });
});