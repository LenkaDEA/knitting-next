'use client';

import { useLayoutEffect } from 'react';

import { useCategoriesStore } from '@/app/_model/CategoriesContext/useCategoriesStore';
import type { CategoriesModel } from '@/shared/stores/models/categories';

type HydrateCategoriesProps = {
  initialCategories: CategoriesModel[];
};

export default function InitializeCreateStores({ initialCategories }: HydrateCategoriesProps) {
  const categoriesStore = useCategoriesStore();

  useLayoutEffect(() => {
    categoriesStore.hydrate(initialCategories);
  }, [initialCategories, categoriesStore]);

  return null;
}
