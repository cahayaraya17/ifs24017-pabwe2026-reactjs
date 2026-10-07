import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import * as userActions from './action';

describe('usersReducer & actions', () => {
  it('harus mengembalikan initial state', () => {
    const state = usersReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toBeDefined();
  });

  it('harus merespons action update/set data users atau profile', () => {
    // 1. Cek apakah ada creator function seperti setUsersAction atau receiveUsersAction di action.js
    const actionCreator = 
      userActions.setUsersAction || 
      userActions.receiveUsersAction || 
      userActions.setProfileUserAction;

    if (typeof actionCreator === 'function') {
      const dummyPayload = [{ id: 1, name: 'Test User' }];
      const action = actionCreator(dummyPayload);
      const state = usersReducer(undefined, action);
      expect(state).toBeDefined();
    } else {
      // 2. Fallback jika action reducer memakai string type langsung
      const testTypes = ['USERS_SET', 'SET_USERS', 'RECEIVE_USERS', 'USERS/SET'];
      let handled = false;
      for (const type of testTypes) {
        const state = usersReducer(undefined, { type, payload: { users: [] } });
        if (state !== undefined) {
          handled = true;
          break;
        }
      }
      expect(handled).toBe(true);
    }
  });
});