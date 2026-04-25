import type { AnyAction, Middleware } from 'redux';

type MetricsEvent = {
  actionType: string;
  timestamp: number;
};

type GlobalWithMetrics = typeof globalThis & {
  __APP_METRICS__?: MetricsEvent[];
};

export const metricsMiddleware: Middleware =
  () => (next) => (action: unknown) => {
    const timestamp = Date.now();
    const actionType =
      typeof action === 'object' && action !== null && 'type' in action
        ? String((action as AnyAction).type)
        : 'unknown';

    const globalWithMetrics = globalThis as GlobalWithMetrics;
    globalWithMetrics.__APP_METRICS__ ??= [];
    globalWithMetrics.__APP_METRICS__.push({ actionType, timestamp });

    return next(action as AnyAction);
  };
