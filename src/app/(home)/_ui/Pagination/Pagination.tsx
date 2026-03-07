'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useQueryState } from 'nuqs';

import Text from '@/components/Text';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';

import { usePatternsStore } from '../../_model/PatternsContext';

import styles from './Pagination.module.scss';

const getPaginationItems = (currentPage: number, pageCount: number) => {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const items: (number | string)[] = [];

  let left = Math.max(1, currentPage - 1);
  let right = Math.min(pageCount, currentPage + 1);

  if (currentPage === 1) right = 3;
  else if (currentPage === pageCount) left = pageCount - 2;

  items.push(1);

  if (left === 3) items.push(2);
  else if (left > 3) items.push('...');

  for (let i = left; i <= right; i++) {
    if (i !== 1 && i !== pageCount) {
      items.push(i);
    }
  }

  if (right === pageCount - 2) items.push(pageCount - 1);
  else if (right < pageCount - 2) items.push('...');

  if (pageCount !== 1) {
    items.push(pageCount);
  }

  return items;
};

const Pagination: React.FC = observer(() => {
  const patternsStore = usePatternsStore();
  const [currentPageParam, setCurrentPageParam] = useQueryState('page', {
    shallow: false,
  });
  const currentPage = Number(currentPageParam) || 1;
  const pageCount = patternsStore.data.meta.pagination?.pageCount || 1;

  const pagesMap = getPaginationItems(currentPage, pageCount);
  const disabledFirst: boolean = currentPage === 1;
  const disabledLast: boolean = currentPage === pageCount;

  const changePage = (value: number) => {
    setCurrentPageParam(String(value));
  };

  return (
    <div className={styles.pagination}>
      <ArrowDownIcon
        color="accent"
        disabled={disabledFirst}
        className={classNames(styles[`pagination__arrow-l`], {
          [styles[`pagination__arrow_disabled`]]: disabledFirst,
        })}
        onClick={() => {
          if (currentPage !== 1) changePage(currentPage - 1);
        }}
      />

      <div className={styles.pagination__numbers}>
        {pagesMap.map((item, index) => (
          <div
            key={index}
            className={classNames(
              styles.pagination__number,
              { [styles[`pagination__number-current`]]: item === currentPage },
              { [styles[`pagination__number-points`]]: item === '...' }
            )}
            onClick={() => {
              if (typeof item === 'number') changePage(item);
            }}
          >
            <Text view="p-l" color={item === currentPage ? 'inverse' : 'accent'}>
              {item}
            </Text>
          </div>
        ))}
      </div>

      <ArrowDownIcon
        color="accent"
        className={classNames(styles[`pagination__arrow-r`], {
          [styles[`pagination__arrow_disabled`]]: disabledLast,
        })}
        disabled={disabledLast}
        onClick={() => {
          if (currentPage !== pageCount) changePage(currentPage + 1);
        }}
      />
    </div>
  );
});

export default Pagination;
