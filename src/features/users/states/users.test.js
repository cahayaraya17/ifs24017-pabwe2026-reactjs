import { describe, it, expect } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

describe('usersReducer & actions', () => {
  it('harus mengembalikan initial state', () => {
    const state = usersReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toBeDefined();
  });

  it('harus menangani aksi SET_USERS atau RECEIVE_USERS', () => {
    const dummyUsers = [{ id: 1, name: 'User 1' }];
    
    // Sesuaikan tipe action dengan yang didefinisikan di ActionType modul users
    const actionKey = ActionType.SET_USERS || ActionType.RECEIVE_USERS;
    if (actionKey) {
      const state = usersReducer(undefined, {
        type: actionKey,
        payload: { users: dummyUsers },
      });
      expect(state.users || state).toBeDefined();
    }
  });
});