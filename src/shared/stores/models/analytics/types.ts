import type { ToolValue } from '@/shared/config/meta';

export enum AnalyticsEvent {
  clickCard = 'click_card',
  clickLike = 'click_like',
  clickCreatePattern = 'click_create_pattern',
  clickSavePattern = 'click_save_pattern',
  errorSavePattern = 'error_save_pattern',
  clickSignUp = 'click_signup',
  registrationSuccess = 'registration_success',
  clickLogout = 'click_logout',
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

  [AnalyticsEvent.errorSavePattern]: {
    errorType: string;
  };

  [AnalyticsEvent.clickSignUp]: {
    fromLocation: 'login' | 'modal';
  };

  [AnalyticsEvent.registrationSuccess]: {
    userDocumentId: string;
  };

  [AnalyticsEvent.clickLogout]: {
    userDocumentId: string;
    userName: string;
  };
};

export type IAnalytics = {
  sendEvent<E extends AnalyticsEvent>(event: E, payload: MapAnalyticsEventToPayload[E]): void;
};
