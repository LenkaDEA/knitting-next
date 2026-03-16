'use client';

import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import Button from '@/shared/components/Button';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import CreatePatternStore from './_module/CreatePatternStore';

const CreatePattern: React.FC = observer(() => {
  const [createPatternStore] = useState(() => new CreatePatternStore(initializeStore().apiStore));

  const handlePostPattern = () => {
    createPatternStore.postCreatePattern();
  };

  return (
    <>
      CreatePattern
      <Button onClick={handlePostPattern}>Создать</Button>
    </>
  );
});

export default CreatePattern;
