import type { AnalyticsEvent, MapAnalyticsEventToPayload } from '@/stores/models/analytics';

import { YaMetrikaModel } from '../../models/analytics/YaMetrikaModel';

import type { IAnalyticsStore } from './types';

export class AnalyticsStore implements IAnalyticsStore {
  readonly ym: YaMetrikaModel | null;

  constructor() {
    this.ym = YaMetrikaModel.init();
  }

  get isInitialized(): boolean {
    return Boolean(this.ym?.initialized);
  }

  sendEvent<E extends AnalyticsEvent>(event: E, payload: MapAnalyticsEventToPayload[E]) {
    if (this.ym) {
      this.ym.sendEvent(event, payload);
    } else {
      this._captureYmError(event, payload);
    }
  }

  private _captureYmError(event: AnalyticsEvent, payload: unknown) {
    /* eslint-disable */
    console.warn(
      `[AnalyticsStore] Счётчик не инициализирован. Событие ${event} пропущено.`,
      payload
    );
      }
}
