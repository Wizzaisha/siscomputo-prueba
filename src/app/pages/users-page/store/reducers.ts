import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './actions.types';
import { UsersResponse } from '../models/users';

export interface UsersState {
  users: UsersResponse[];
}

export const usersInitialState: UsersState = {
  users: [],
};

export const UsersReducer = createReducer(
  usersInitialState,

  on(UsersActions.setUsersData, (state, action) => {
    return {
      ...state,
      users: action.data,
    };
  })
);
