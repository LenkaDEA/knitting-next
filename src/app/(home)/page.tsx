import CategoriesStore from '@/app/_model/CategoriesStore';
import { initializeStore } from '@/shared/stores/global/initializeStore';

import InitializeStores from './_model/InitializeStores';
import { fetchNextPatternsServer } from './_model/actions';
import Patterns from './_ui/Patterns';

type MySearchParams = Record<string, string | string[] | undefined>;

type HomeProps = {
  searchParams: Promise<MySearchParams>;
};

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const page = 1;
  const params = await searchParams;
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
  const categoriesStore = new CategoriesStore(rootStore.apiStore);

  const [patterns] = await Promise.all([
    fetchNextPatternsServer(page, search, categories),
    categoriesStore.getCategories({ next: { revalidate: 60 } }),
  ]);

  return (
    <>
      <InitializeStores initialCategories={categoriesStore.data} initialPatterns={patterns.data} />
      <Patterns />
    </>
  );
};

export default Home;
