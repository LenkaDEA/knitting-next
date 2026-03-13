import ApiStore from '@/shared/stores/global/ApiStore';
import UserStore from '@/stores/global/UserStore';

export class RootStore {
  readonly apiStore: ApiStore;
  readonly userStore: UserStore;

  constructor(baseUrl: string) {
    this.apiStore = new ApiStore(baseUrl);
    this.userStore = new UserStore(this);
  }
}
