import { PAGE_SIZE } from '@/shared/config/meta';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import CategoriesStore from './_model/CategoriesStore';
import InitializeStores from './_model/InitializeStores';
import PatternsStore from './_model/PatternsStore';
import Patterns from './_ui/Patterns';

type MySearchParams = Record<string, string | string[] | undefined>;

type HomeProps = {
  searchParams: Promise<MySearchParams>;
};

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const page = Number(pageParam) || 1;
  const searchParam = Array.isArray(params.search) ? params.search[0] : params.search;
  const search = searchParam || '';
  const rawCategories = params.categories;
  const categories =
    typeof rawCategories === 'string'
      ? rawCategories.split(',')
      : Array.isArray(rawCategories)
        ? rawCategories
        : [];

  const rootStore = initializeStore();
  const patternsStore = new PatternsStore(rootStore.apiStore);
  const categoriesStore = new CategoriesStore(rootStore.apiStore);

  await Promise.all([
    patternsStore.getPatterns({
      currentPage: page,
      pageSize: PAGE_SIZE,
      searchValue: search,
      categories,
      next: { revalidate: 60 },
    }),
    categoriesStore.getCategories({ next: { revalidate: 60 } }),
  ]);

  return (
    <>
      <InitializeStores
        initialCategories={categoriesStore.data}
        initialPatterns={patternsStore.data}
      />
      <Patterns patterns={patternsStore.data.data} metaStore={patternsStore.meta} />
    </>
  );
};

export default Home;
