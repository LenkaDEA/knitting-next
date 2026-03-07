'use client';

import { useEffect, useState, type ReactNode } from 'react';

import type { CategoriesModel } from '@/shared/stores/models/categories';
import { useRootStore } from '@/stores/context/RootContext';

import CategoriesStore from '../CategoriesStore';

import { CategoriesContext } from './CategoriesContext';

export const CategoriesProvider: React.FC<{
  children: ReactNode;
  initialData?: CategoriesModel[];
}> = ({ children, initialData }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new CategoriesStore(apiStore, initialData));

  useEffect(() => {
    store.hydrate(initialData);
  }, [initialData, store]);

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);
  return <CategoriesContext.Provider value={store}>{children}</CategoriesContext.Provider>;
};
