import { describe, it, expect, vi } from 'vitest';
import * as userApi from './userApi';
import apiHelper from '../../../helpers/apiHelper';

vi.mock('../../../helpers/apiHelper');

describe('userApi', () => {
  it('memastikan fungsi-fungsi userApi terdefinisi', () => {
    expect(userApi).toBeDefined();
  });
});