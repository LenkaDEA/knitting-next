'use client';

import { useEffect, useState, type ReactNode } from 'react';

import type { StrapiResponse } from '@/shared/stores/models';
import type { PatternModel } from '@/shared/stores/models/patterns';
import { useRootStore } from '@/stores/context/RootContext';

import PatternsStore from '../PatternsStore';

import { PatternContext } from './PatternsContext';

export const PatternsProvider: React.FC<{
  children: ReactNode;
  initialData?: StrapiResponse<PatternModel[]>;
}> = ({ children, initialData }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new PatternsStore(apiStore, initialData));

  useEffect(() => {
    store.hydrate(initialData);
  }, [initialData, store]);

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);
  return <PatternContext.Provider value={store}>{children}</PatternContext.Provider>;
};
