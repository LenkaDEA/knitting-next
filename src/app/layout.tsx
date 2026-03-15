import '@/styles/styles.scss';
import '@/stores/setup';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import Header from '@/app/_ui/Header';
import { RootProvider } from '@/shared/stores/context/RootContext';

import Container from './_ui/Container';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Knitting',
  description: 'Доступные уроки по вязанию',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
          <NuqsAdapter>
            <Header />
            <Container tag={'main'} className={styles.App__main}>
              <RootProvider>{children}</RootProvider>
            </Container>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
