import { useContext } from 'react';

import { PatternContext } from './PatternsContext';

export const usePatternsStore = () => {
  const store = useContext(PatternContext);
  if (!store) throw new Error(`use PatternsStore is empty`);
  return store;
};
