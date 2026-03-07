import { useContext } from 'react';

import { CategoriesContext } from './CategoriesContext';

export const useCategoriesStore = () => {
  const store = useContext(CategoriesContext);
  if (!store) throw new Error(`use CategoriesStore is empty`);
  return store;
};
