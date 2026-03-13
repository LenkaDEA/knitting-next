'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { useRootStore } from '@/stores/context/RootContext';

import CategoriesStore from '../CategoriesStore';

import { CategoriesContext } from './CategoriesContext';

export const CategoriesProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new CategoriesStore(apiStore));

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);

  return <CategoriesContext.Provider value={store}>{children}</CategoriesContext.Provider>;
};
