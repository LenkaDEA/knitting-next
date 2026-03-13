import type { Metadata } from 'next';

import ProtectedRoute from './_ui/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Личный кабинет | Knitting',
  description: 'Личный кабинет на Knitting',
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
