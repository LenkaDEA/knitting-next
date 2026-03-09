import { CategoriesProvider } from './_model/CategoriesContext';
import { PatternsProvider } from './_model/PatternsContext';
import Banner from './_ui/Banner';
import FilterActions from './_ui/FilterActions';
import Pagination from './_ui/Pagination';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Banner />
      <PatternsProvider>
        <CategoriesProvider>
          <FilterActions />
          {children}
          <Pagination />
        </CategoriesProvider>
      </PatternsProvider>
    </>
  );
}
