import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './reducers';

export const selectModuleState = createFeatureSelector<UsersState>('usersPage');

export const selectAllUsers = createSelector(
  selectModuleState,
  (state) => state.users
);
