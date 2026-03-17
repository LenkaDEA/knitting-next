import type { Metadata } from 'next';

import { CategoriesProvider } from '@/app/_model/CategoriesContext';

import { CreatePatternProvider } from './_module/CreatePatternContext';

export const metadata: Metadata = {
  title: 'Создать урок | Knitting',
  description: 'Создать мастер класс на Knitting',
};

export default function CreatePatternLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CategoriesProvider>
      <CreatePatternProvider>{children}</CreatePatternProvider>
    </CategoriesProvider>
  );
}
