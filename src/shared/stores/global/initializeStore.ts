import { STRAPI_URL } from '@/config/apiUrls';

import { RootStore } from './RootStore';

let clientStore: RootStore | null = null;
const isServer = typeof window === 'undefined';

export const initializeStore = (): RootStore => {
  if (isServer) {
    return new RootStore(STRAPI_URL);
  }

  if (!clientStore) {
    clientStore = new RootStore(STRAPI_URL);
  }

  return clientStore;
};
