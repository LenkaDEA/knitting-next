import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Регистрация | Knitting',
  description: 'Регистрация на Knitting',
};

export default function SingUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
