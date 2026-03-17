import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CategoriesProvider } from '@/app/_model/CategoriesContext';

import { PatternsProvider } from './_model/PatternsContext';
import Banner from './_ui/Banner';
import FilterActions from './_ui/FilterActions';
import InfiniteScrollPatterns from './_ui/InfiniteScrollPatterns';

export const metadata: Metadata = {
  title: 'Все схемы | Knitting',
  description: 'Все схемы на Knitting',
};

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
          <Suspense>
            <FilterActions />
            {children}
            <InfiniteScrollPatterns />
          </Suspense>
        </CategoriesProvider>
      </PatternsProvider>
    </>
  );
}
