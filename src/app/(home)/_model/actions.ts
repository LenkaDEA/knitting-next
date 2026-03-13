'use server';

import type { MetaType } from '@/shared/config/meta';
import { PAGE_SIZE } from '@/shared/config/meta';
import { initializeStore } from '@/shared/stores/global/initializeStore';
import type { StrapiResponse } from '@/shared/stores/models';
import type { PatternModel } from '@/shared/stores/models/patterns';

import PatternsStore from './PatternsStore';

export async function fetchNextPatternsServer(
  page: number,
  search: string,
  categories: string[]
): Promise<{ data: StrapiResponse<PatternModel[]>; meta: MetaType }> {
  const rootStore = initializeStore();
  const patternsStore = new PatternsStore(rootStore.apiStore);

  try {
    await patternsStore.getPatterns({
      currentPage: page,
      pageSize: PAGE_SIZE,
      searchValue: search,
      categories,
      next: { revalidate: 60 },
    });

    return {
      data: patternsStore.data,
      meta: patternsStore.meta,
    };
  } catch {
    return {
      data: { data: [], meta: { pagination: { page: 0, pageSize: 0, pageCount: 0, total: 0 } } },
      meta: patternsStore.meta,
    };
  }
}
