import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  initializeMockData,
  persistor,
  store,
  type AppDispatch,
} from '@app/store';
import './index.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element "#root" was not found.');
}

(store.dispatch as AppDispatch)(initializeMockData());

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
