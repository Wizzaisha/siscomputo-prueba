import { ActionReducerMap } from '@ngrx/store';
import {
  usersInitialState,
  UsersReducer,
  UsersState,
} from '../../pages/users-page/store/reducers';

export interface AppState {
  //States
  usersPage: UsersState;
}

const initialAppState: AppState = {
  //Initial states
  usersPage: usersInitialState,
};

export const reducers: ActionReducerMap<AppState> = {
  //Reducers map
  usersPage: UsersReducer,
};

export const PERSISTED_KEYS: (keyof AppState)[] = [
  //Persisted keys
  'usersPage',
];
