import type { AnyAction, Action } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import type { RootState } from './root-reducer';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
