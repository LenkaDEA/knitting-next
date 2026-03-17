import CategoriesStore from '@/app/_model/CategoriesStore';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import InitializeCreateStores from './_module/InitializeCreateStores';
import CreatePatternForm from './_ui/CreatePatternForm';

const CreatePattern: React.FC = async () => {
  const rootStore = initializeStore();
  const categoriesStore = new CategoriesStore(rootStore.apiStore);
  await categoriesStore.getCategories({ next: { revalidate: 60 } });
  return (
    <>
      <InitializeCreateStores initialCategories={categoriesStore.data} />
      <CreatePatternForm />
    </>
  );
};

export default CreatePattern;
