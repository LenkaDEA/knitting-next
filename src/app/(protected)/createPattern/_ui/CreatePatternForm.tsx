'use client';

import { observer } from 'mobx-react-lite';
import type { SubmitEvent } from 'react';
import { useReducer, useState } from 'react';

import { useCategoriesStore } from '@/app/_model/CategoriesContext';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import type { Option } from '@/shared/components/MultiDropdown';
import MultiDropdown from '@/shared/components/MultiDropdown';
import Text from '@/shared/components/Text';
import type { ToolValue } from '@/shared/config/meta';
import { Meta, TOOLS } from '@/shared/config/meta';
import type { CategoriesModel } from '@/shared/stores/models/categories';
import type { CreatePatternModel } from '@/shared/stores/models/patterns/patternCreate';

import { useCreatePattern } from '../_module/CreatePatternContext';

import styles from './CreatePatternForm.module.scss';
import SuccessCreate from './SuccessCreate';

const initialState: CreatePatternModel = {
  slug: '',
  title: '',
  shortDescription: '',
  categories: [],
  description: '',
  cover: null,
  tool: TOOLS.hook.key,
  videoUrl: '',
};

const TOOL_OPTIONS = Object.values(TOOLS).map((item) => ({
  key: item.key,
  value: item.label,
}));

type Action = {
  type: 'set_field';
  field: keyof CreatePatternModel;
  payload: string | ToolValue | File | null | CategoriesModel[];
};

function reducerPattern(state: CreatePatternModel, action: Action): CreatePatternModel {
  switch (action.type) {
    case 'set_field':
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
}

const CreatePatternForm: React.FC = observer(() => {
  const createPatternStore = useCreatePattern();
  const categories = useCategoriesStore();
  const [state, dispatch] = useReducer(reducerPattern, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const optionsCategories: Option[] = categories.data.map((item) => ({
    key: item.slug,
    value: item.name,
  }));

  const selectedCategories: Option[] = categories.data
    .filter((cat) => (state.categories || []).some((stateCat) => stateCat.slug === cat.slug))
    .map((item) => ({
      key: item.slug,
      value: item.name,
    }));

  const getTitleText = (options: Option[]) => {
    return options.length ? options.map((item) => item.value).join(', ') : 'Выбрать категории';
  };

  const handleSelectCategories = (selectedCategories: Option[]) => {
    const selectedModels = selectedCategories.map((opt) => {
      return categories.data.find((c) => c.slug === opt.key) as CategoriesModel;
    });
    handleChange('categories', selectedModels);
  };

  const handleChange = (
    field: keyof CreatePatternModel,
    value: string | ToolValue | File | null | CategoriesModel[]
  ) => {
    createPatternStore.resetMeta();
    dispatch({ type: 'set_field', field, payload: value });
    setIsLoading(false);
  };

  const handlePostPattern = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    createPatternStore.updateData(state);
    try {
      await createPatternStore.postCreatePattern();
    } finally {
      if (createPatternStore.meta === Meta.error) {
        setIsLoading(false);
      }
    }
  };

  const valueMultiDropDown: Option[] = [
    {
      key: state.tool,
      value: TOOLS[state.tool as ToolValue].label,
    },
  ];

  if (createPatternStore.meta === Meta.success) return <SuccessCreate />;

  return (
    <div className={styles.createPattern}>
      <Text view="title" color="accent" weight="bold">
        Создать урок по вязанию
      </Text>

      <form className={styles.createPattern__form} onSubmit={handlePostPattern}>
        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Название изделия
          </Text>
          <Input
            value={state.title}
            onChange={(value) => handleChange('title', value)}
            placeholder="Введите название изделия"
          />
        </div>

        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Обложка урока
          </Text>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              handleChange('cover', file);
            }}
          />
        </div>

        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Описание готового изделия
          </Text>
          <Input
            value={state.shortDescription}
            onChange={(value) => handleChange('shortDescription', value)}
            placeholder="Введите короткое описание изделия"
          />
        </div>

        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Категория изделия
          </Text>
          <MultiDropdown
            options={optionsCategories}
            value={selectedCategories}
            getTitle={getTitleText}
            onChange={handleSelectCategories}
          />
        </div>

        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Подробная инструкция по вязанию
          </Text>
          <Input
            value={state.description}
            onChange={(value) => handleChange('description', value)}
            placeholder="Введите короткое описание урока"
          />
        </div>

        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Инструмент
          </Text>
          <MultiDropdown
            options={TOOL_OPTIONS}
            value={valueMultiDropDown}
            getTitle={(selected) => selected[0].value}
            onChange={(selectedOptions) => {
              if (selectedOptions.length === 0) {
                return;
              }
              const lastSelected = selectedOptions[selectedOptions.length - 1];
              handleChange('tool', lastSelected.key);
            }}
          />
        </div>

        <div className={styles.createPattern__field}>
          <Text view="p-l" color="accent" weight="medium">
            Ссылка на RuTube
          </Text>
          <Input
            value={state.videoUrl}
            type="url"
            onChange={(value) => handleChange('videoUrl', value)}
            placeholder="Введите ссылку на видео с RuTube"
          />
        </div>

        <div className={styles.createPattern__actions}>
          {createPatternStore.meta === Meta.error && (
            <Text color="error">Данные не заполнены или не уникальны</Text>
          )}
          <Button type="submit" loading={isLoading}>
            Создать
          </Button>
        </div>
      </form>
    </div>
  );
});

export default CreatePatternForm;
