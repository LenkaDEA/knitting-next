'use client';

import { useContext } from 'react';

import { RootContext } from '@/stores/context/RootContext';

export const useRootStore = () => {
  const store = useContext(RootContext);
  if (!store) throw new Error(`use RootStore is empty`);
  return store;
};
