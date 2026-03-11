import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Войти | Knitting',
  description: 'Авторизация на Knitting',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
