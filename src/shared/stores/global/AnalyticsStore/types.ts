import type { AnalyticsEvent, MapAnalyticsEventToPayload } from '../../models/analytics';
import type { YaMetrikaModel } from '../../models/analytics/YaMetrikaModel';

export type IAnalyticsStore = {
  readonly ym: YaMetrikaModel | null;
  isInitialized: boolean;
  sendEvent<E extends AnalyticsEvent>(event: E, payload: MapAnalyticsEventToPayload[E]): void;
};
