import type { AnalyticsEvent, IAnalytics, MapAnalyticsEventToPayload } from './types';

export abstract class AnalyticsModel<I extends string | number> implements IAnalytics {
  readonly id: I;

  protected constructor(id: I) {
    this.id = id;
  }

  abstract get initialized(): boolean;

  abstract sendEvent<E extends AnalyticsEvent>(
    event: E,
    payload: MapAnalyticsEventToPayload[E]
  ): void;
}
