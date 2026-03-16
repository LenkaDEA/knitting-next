'use client';

import { useEffect, useState, type ReactNode } from 'react';

import type { PatternFullModel } from '@/shared/stores/models/patterns';
import { useRootStore } from '@/stores/context/RootContext';

import CreatePatternStore from '../CreatePatternStore';

import { CreatePatternContext } from './CreatePatternContext';

export const CreatePatternProvider: React.FC<{
  children: ReactNode;
  initialData?: PatternFullModel;
}> = ({ children, initialData }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new CreatePatternStore(apiStore, initialData));

  useEffect(() => {
    store.hydrate(initialData);
  }, [initialData, store]);

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);

  return <CreatePatternContext.Provider value={store}>{children}</CreatePatternContext.Provider>;
};
