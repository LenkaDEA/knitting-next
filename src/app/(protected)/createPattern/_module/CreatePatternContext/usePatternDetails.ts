import { useContext } from 'react';

import { CreatePatternContext } from './CreatePatternContext';

export const useCreatePattern = () => {
  const store = useContext(CreatePatternContext);
  if (!store) throw new Error('use CreatePattern is empty');
  return store;
};
