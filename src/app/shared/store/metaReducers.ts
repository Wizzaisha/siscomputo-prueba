import { ActionReducer, MetaReducer } from '@ngrx/store';
import { AppState, PERSISTED_KEYS } from './app.reducer';
import { environment } from '../../../environments/environment.development';

const STORAGE_KEY = 'APP_STATE';

export function localStorageMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    const nextState = reducer(state, action);

    const stateToPersist = PERSISTED_KEYS.reduce((acc, key) => {
      acc[key] = nextState[key];
      return acc;
    }, {} as Partial<AppState>);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));

    return nextState;
  };
}

export function rehydrateState(): Partial<AppState> | undefined {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    console.warn('Error parsing localStorage state');
    return undefined;
  }
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [clearState, localStorageMetaReducer]
  : [clearState, localStorageMetaReducer];
