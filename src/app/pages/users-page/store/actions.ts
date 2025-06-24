import { createAction, props } from '@ngrx/store';
import { UsersResponse } from '../models/users';

const SET_USERS_DATA = '[Set Users] Set Users Data';

export const setUsersData = createAction(
  SET_USERS_DATA,
  props<{ data: UsersResponse[] }>()
);
