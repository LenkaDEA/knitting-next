import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Обо мне | Knitting',
  description: 'Об создателе Knitting',
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
