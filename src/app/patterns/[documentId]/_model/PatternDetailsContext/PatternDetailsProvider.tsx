'use client';

import { useEffect, useState, type ReactNode } from 'react';

import type { PatternFullModel } from '@/shared/stores/models/patterns';
import { useRootStore } from '@/stores/context/RootContext';

import PatternDetailsStore from '../PatternDetailsStore';

import { PatternDetailsContext } from './PatternDetailsContext';

export const PatternDetailsProvider: React.FC<{
  children: ReactNode;
  initialData?: PatternFullModel;
}> = ({ children, initialData }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new PatternDetailsStore(apiStore, initialData));

  useEffect(() => {
    store.hydrate(initialData);
  }, [initialData, store]);

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);
  return <PatternDetailsContext.Provider value={store}>{children}</PatternDetailsContext.Provider>;
};
