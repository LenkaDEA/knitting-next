export enum AnalyticsEvent {
  clickCardHome = 'click_card_home',
  clickCardFavorites = 'click_card_favorites',
  clickLike = 'click_like',
}

export type MapAnalyticsEventToPayload = {
  [AnalyticsEvent.clickCardHome]: {
    cardDocumentId: string;
    cardTitle: string;
  };

  [AnalyticsEvent.clickCardFavorites]: {
    cardDocumentId: string;
    cardTitle: string;
  };

  [AnalyticsEvent.clickLike]: {
    cardId: string;
    isFavorite: boolean;
  };
};

export type IAnalytics = {
  sendEvent<E extends AnalyticsEvent>(event: E, payload: MapAnalyticsEventToPayload[E]): void;
};
