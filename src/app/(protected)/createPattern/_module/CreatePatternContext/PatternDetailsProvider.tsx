'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { useRootStore } from '@/stores/context/RootContext';

import CreatePatternStore from '../CreatePatternStore';

import { CreatePatternContext } from './CreatePatternContext';

export const CreatePatternProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { apiStore } = useRootStore();
  const [store] = useState(() => new CreatePatternStore(apiStore));

  useEffect(() => {
    return () => {
      store.destroy();
    };
  }, [store]);

  return <CreatePatternContext.Provider value={store}>{children}</CreatePatternContext.Provider>;
};
