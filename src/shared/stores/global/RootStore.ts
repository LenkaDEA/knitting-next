import ApiStore from '@/shared/stores/global/ApiStore';
import UserStore from '@/stores/global/UserStore';

import { AnalyticsStore } from './AnalyticsStore/AnalyticsStore';

export class RootStore {
  readonly apiStore: ApiStore;
  readonly userStore: UserStore;
  readonly analyticsStore: AnalyticsStore;

  constructor(baseUrl: string) {
    this.apiStore = new ApiStore(baseUrl);
    this.userStore = new UserStore(this);
    this.analyticsStore = new AnalyticsStore();
  }
}
