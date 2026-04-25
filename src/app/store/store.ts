import {
  applyMiddleware,
  compose,
  createStore,
  type AnyAction,
  type Reducer,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';
import { metricsMiddleware } from './middlewares/metrics-middleware';
import type { RootState } from './root-reducer';

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['favorites'],
};

const persistedReducer = persistReducer<RootState, AnyAction>(
  persistConfig,
  rootReducer as unknown as Reducer<RootState, AnyAction>,
);

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (
      window as unknown as {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
      }
    ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, metricsMiddleware)),
);

export const persistor = persistStore(store);
