import { PAGE_SIZE } from '@/shared/config/meta';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import { CategoriesProvider } from './_model/CategoriesContext';
import CategoriesStore from './_model/CategoriesStore';
import { PatternsProvider } from './_model/PatternsContext';
import PatternsStore from './_model/PatternsStore';
import Banner from './_ui/Banner';
import FilterActions from './_ui/FilterActions';
import Pagination from './_ui/Pagination';
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

  const patternsStore = new PatternsStore(initializeStore().apiStore);
  const categoriesStore = new CategoriesStore(initializeStore().apiStore);

  await patternsStore.getPatterns({
    currentPage: page,
    pageSize: PAGE_SIZE,
    searchValue: search,
    categories,
  });

  await categoriesStore.getCategories();

  return (
    <>
      <Banner />

      <PatternsProvider initialData={patternsStore.data}>
        <CategoriesProvider initialData={categoriesStore.data}>
          <FilterActions />
        </CategoriesProvider>

        <Patterns patterns={patternsStore.data.data} metaStore={patternsStore.meta} />

        <Pagination />
      </PatternsProvider>
    </>
  );
};

export default Home;
