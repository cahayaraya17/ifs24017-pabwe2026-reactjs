import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/states/reducer';
import usersReducer from './features/users/states/reducer';
import lostFoundsReducer from './features/lost-founds/states/reducer';

export const makeStore = (preloadedState) =>
  configureStore({
    reducer: { auth: authReducer, users: usersReducer, lostFounds: lostFoundsReducer },
    preloadedState,
  });

export function renderWithProviders(ui, { route = '/', preloadedState, store = makeStore(preloadedState) } = {}) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
}