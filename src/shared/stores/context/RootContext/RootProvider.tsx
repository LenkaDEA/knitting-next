'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { initializeStore } from '@/shared/stores/global/initializeStore';
import { RootContext } from '@/stores/context/RootContext';

export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store] = useState(() => initializeStore());

  useEffect(() => {
    store.userStore.checkAuth();
  }, [store.userStore]);

  return <RootContext.Provider value={store}>{children}</RootContext.Provider>;
};
