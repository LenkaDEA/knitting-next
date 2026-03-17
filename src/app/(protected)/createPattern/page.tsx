'use client';

import { observer } from 'mobx-react-lite';
import type { SubmitEvent } from 'react';
import { useReducer, useState } from 'react';

import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import type { Option } from '@/shared/components/MultiDropdown';
import MultiDropdown from '@/shared/components/MultiDropdown';
import Text from '@/shared/components/Text';
import type { ToolValue } from '@/shared/config/meta';
import { TOOLS } from '@/shared/config/meta';
import { initializeStore } from '@/shared/stores/global/initializeStore';
import type { CreatePatternModel } from '@/shared/stores/models/patterns/patternCreate';

import CreatePatternStore from './_module/CreatePatternStore';
import styles from './page.module.scss';

const initialState: CreatePatternModel = {
  slug: '',
  title: '',
  shortDescription: '',
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
  payload: string | ToolValue | File | null;
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

const CreatePattern: React.FC = observer(() => {
  const [createPatternStore] = useState(() => new CreatePatternStore(initializeStore().apiStore));
  const [state, dispatch] = useReducer(reducerPattern, initialState);

  const handleChange = (
    field: keyof CreatePatternModel,
    value: string | ToolValue | File | null
  ) => {
    dispatch({ type: 'set_field', field, payload: value });
  };

  const handlePostPattern = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPatternStore.updateData(state);
    await createPatternStore.postCreatePattern();
  };

  const valueMultiDropDown: Option[] = [
    {
      key: state.tool,
      value: TOOLS[state.tool as ToolValue].label,
    },
  ];
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
          <Button type="submit">Создать</Button>
        </div>
      </form>
    </div>
  );
});

export default CreatePattern;
