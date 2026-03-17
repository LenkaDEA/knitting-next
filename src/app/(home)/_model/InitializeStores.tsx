'use client';

import { useLayoutEffect } from 'react';

import { useCategoriesStore } from '@/app/_model/CategoriesContext/useCategoriesStore';
import type { StrapiResponse } from '@/shared/stores/models';
import type { CategoriesModel } from '@/shared/stores/models/categories';
import type { PatternModel } from '@/shared/stores/models/patterns';

import { usePatternsStore } from './PatternsContext';

type HydrateCategoriesProps = {
  initialCategories: CategoriesModel[];
  initialPatterns: StrapiResponse<PatternModel[]>;
};

export default function InitializeStores({
  initialCategories,
  initialPatterns,
}: HydrateCategoriesProps) {
  const categoriesStore = useCategoriesStore();
  const patternsStore = usePatternsStore();

  useLayoutEffect(() => {
    categoriesStore.hydrate(initialCategories);
  }, [initialCategories, categoriesStore]);

  useLayoutEffect(() => {
    patternsStore.hydrate(initialPatterns);
  }, [initialPatterns, patternsStore]);

  return null;
}
