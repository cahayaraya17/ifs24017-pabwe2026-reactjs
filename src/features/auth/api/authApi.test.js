import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../helpers/apiHelper', () => ({
  default: { post: vi.fn().mockResolvedValue('p'), get: vi.fn().mockResolvedValue('g') },
}));

import apiHelper from '../../../helpers/apiHelper';
import { postRegisterApi, postLoginApi, getMyProfileApi } from './authApi';

describe('authApi', () => {
  it('memanggil endpoint yang benar', async () => {
    await postRegisterApi({ a: 1 });
    expect(apiHelper.post).toHaveBeenCalledWith('/auth/register', { a: 1 });
    await postLoginApi({ b: 2 });
    expect(apiHelper.post).toHaveBeenCalledWith('/auth/login', { b: 2 });
    await getMyProfileApi();
    expect(apiHelper.get).toHaveBeenCalledWith('/users/me');
  });
});