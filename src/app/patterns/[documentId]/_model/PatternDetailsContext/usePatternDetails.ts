import { useContext } from 'react';

import { PatternDetailsContext } from './PatternDetailsContext';

export const usePatternDetails = () => {
  const store = useContext(PatternDetailsContext);
  if (!store) throw new Error('use PatternDetails is empty');
  return store;
};
