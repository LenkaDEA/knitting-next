import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Создать урок | Knitting',
  description: 'Создать мастер класс на Knitting',
};

export default function CreatePatternLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
