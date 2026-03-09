'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { useRootStore } from '@/stores/context/RootContext';

import PatternsStore from '../PatternsStore';

import { PatternContext } from './PatternsContext';

export const PatternsProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new PatternsStore(apiStore));

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);

  return <PatternContext.Provider value={store}>{children}</PatternContext.Provider>;
};
