'use client';

import { observer } from 'mobx-react-lite';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import React from 'react';

import Input from '@/components/Input';
import type { Option } from '@/components/MultiDropdown';
import MultiDropdown from '@/components/MultiDropdown';
import Text from '@/components/Text';
import ClearIcon from '@/components/icons/ClearIcon';

import { useCategoriesStore } from '../../_model/CategoriesContext';
import { usePatternsStore } from '../../_model/PatternsContext';

import styles from './FilterActions.module.scss';

// import { Meta } from '@/config/meta';

const FilterActions: React.FC = observer(() => {
  const patternsStore = usePatternsStore();
  const categories = useCategoriesStore();

  const [searchParams, setSearchParams] = useQueryStates(
    {
      search: parseAsString.withDefault(''),
      categories: parseAsArrayOf(parseAsString).withDefault([]),
      page: parseAsString.withDefault('1'),
    },
    {
      shallow: false,
      throttleMs: 300,
    }
  );

  const optionsMultiDropdown: Option[] = categories.data.map((item) => ({
    key: item.slug,
    value: item.name,
  }));

  const selectedCategories: Option[] = categories.data
    .filter((cat) => searchParams.categories.includes(cat.slug))
    .map((item) => ({
      key: item.slug,
      value: item.name,
    }));

  const getTitleText = (options: Option[]) => {
    return options.length ? options.map((item) => item.value).join(', ') : 'Выбрать категории';
  };

  const handleSelectCategories = (selectedCategories: Option[]) => {
    setSearchParams({ categories: selectedCategories.map((i) => i.key), page: '1' });
  };

  const handleChangeInput = (value: string) => {
    setSearchParams({ search: value, page: '1' });
  };

  const handleClearSearch = () => {
    setSearchParams({ search: '', page: '1' });
  };

  // if (categories.meta === Meta.error) return <Navigate to="/404" replace />;

  return (
    <div className={styles.filterActions}>
      <Input
        value={searchParams.search || ''}
        placeholder="Найти мастер-класс"
        onChange={handleChangeInput}
        afterSlot={
          <ClearIcon
            color={searchParams.search ? 'accent' : 'secondary'}
            onClick={handleClearSearch}
          />
        }
      />
      <MultiDropdown
        className={styles.filterActions__multiDropdown}
        options={optionsMultiDropdown}
        value={selectedCategories}
        onChange={handleSelectCategories}
        getTitle={getTitleText}
      />
      <div className={styles.filterActions__total}>
        <Text view="p-xl" color="accent" weight="bold">
          Всего мастер-классов
        </Text>
        <Text view="p-m" color="secondary">
          {patternsStore.data.meta.pagination?.total || 0}
        </Text>
      </div>
    </div>
  );
});

export default FilterActions;
