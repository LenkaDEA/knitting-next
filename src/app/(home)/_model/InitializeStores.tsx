'use client';

import { useLayoutEffect } from 'react';

import type { StrapiResponse } from '@/shared/stores/models';
import type { CategoriesModel } from '@/shared/stores/models/categories';
import type { PatternModel } from '@/shared/stores/models/patterns';

import { useCategoriesStore } from './CategoriesContext/useCategoriesStore';
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
