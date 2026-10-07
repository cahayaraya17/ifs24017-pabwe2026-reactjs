import { describe, it, expect } from 'vitest';
import store from './store';

describe('store', () => {
  it('memiliki slice auth, users, lostFounds', () => {
    expect(Object.keys(store.getState())).toEqual(expect.arrayContaining(['auth', 'users', 'lostFounds']));
  });
});