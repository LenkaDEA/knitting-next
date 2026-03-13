'use client';

import { observer } from 'mobx-react-lite';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Loader from '@/shared/components/Loader';
import { Meta } from '@/shared/config/meta';

import { usePatternsStore } from '../../_model/PatternsContext';
import { fetchNextPatternsServer } from '../../_model/actions';

import styles from './InfiniteScrollPatterns.module.scss';

const InfiniteScrollPatterns: React.FC = observer(() => {
  const patternsStore = usePatternsStore();
  const { ref, inView } = useInView({ threshold: 0.8 });
  const [isLoading, setIsLoading] = useState(false);

  const currentPage = patternsStore.data.meta.pagination?.page || 1;
  const pageCount = patternsStore.data.meta.pagination?.pageCount || 1;
  const [searchParam] = useQueryState('search');
  const [categoriesParam] = useQueryState('categories');

  const hasMore = currentPage < pageCount;

  const loadMore = useCallback(async () => {
    if (!inView || !hasMore || isLoading) return;

    setIsLoading(true);

    const nextPage = currentPage + 1;
    const categories =
      typeof categoriesParam === 'string'
        ? categoriesParam.split(',')
        : Array.isArray(categoriesParam)
          ? categoriesParam
          : [];
    const search = searchParam || '';

    const response = await fetchNextPatternsServer(nextPage, search, categories);

    if (response.meta !== Meta.error && response.data.data.length > 0) {
      patternsStore.appendPatterns(response.data.data, response.data.meta);
    }
    setIsLoading(false);
  }, [inView, hasMore, isLoading, currentPage, searchParam, categoriesParam, patternsStore]);

  useEffect(() => {
    if (inView) loadMore();
  }, [inView, loadMore]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className={styles.scroll}>
      {isLoading ? <Loader /> : <div style={{ height: '8px' }} />}
    </div>
  );
});

export default InfiniteScrollPatterns;
