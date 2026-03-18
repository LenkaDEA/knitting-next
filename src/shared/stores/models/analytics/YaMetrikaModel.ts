import { AnalyticsModel } from './AnalyticsModel';
import type { AnalyticsEvent, MapAnalyticsEventToPayload } from './types';

export class YaMetrikaModel extends AnalyticsModel<number> {
  private constructor(id: number) {
    super(id);
  }

  get initialized(): boolean {
    return typeof window !== 'undefined' && typeof window.ym === 'function';
  }

  sendEvent<E extends AnalyticsEvent>(event: E, payload: MapAnalyticsEventToPayload[E]): void {
    if (this.initialized) {
      window.ym(this.id, 'reachGoal', event, payload);
    }
  }

  static init(): YaMetrikaModel | null {
    const id = Number(process.env.NEXT_PUBLIC_YM_ID);

    if (!id || isNaN(id)) {
      return null;
    }

    return new YaMetrikaModel(id);
  }
}
