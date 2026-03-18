import type { ToolValue } from '@/shared/config/meta';

export enum AnalyticsEvent {
  clickCard = 'click_card',
  clickLike = 'click_like',
  clickCreatePattern = 'click_create_pattern',
  clickSavePattern = 'click_save_pattern',
  clickErrorSavePattern = 'click_error_save_pattern',
}

export type MapAnalyticsEventToPayload = {
  [AnalyticsEvent.clickCard]: {
    cardDocumentId: string;
    cardTitle: string;
    location: 'home' | 'favorites';
  };

  [AnalyticsEvent.clickLike]: {
    cardDocumentId: string;
    isFavorite: boolean;
  };

  [AnalyticsEvent.clickCreatePattern]: {
    userDocumentId: string;
    userName: string;
  };

  [AnalyticsEvent.clickSavePattern]: {
    userDocumentId: string;
    userName: string;
    tool: ToolValue;
  };

  [AnalyticsEvent.clickErrorSavePattern]: {
    errorType: string;
  };
};

export type IAnalytics = {
  sendEvent<E extends AnalyticsEvent>(event: E, payload: MapAnalyticsEventToPayload[E]): void;
};
