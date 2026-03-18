import '@/styles/styles.scss';
import '@/stores/setup';

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

import Header from '@/app/_ui/Header';
import YandexMetrika from '@/shared/components/YandexMetrika/YandexMetrika';
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
            <RootProvider>
              <Header />
              <Container tag={'main'} className={styles.App__main}>
                {children}
              </Container>
              <Suspense fallback={null}>
                <YandexMetrika />
              </Suspense>
            </RootProvider>
          </NuqsAdapter>
        </ThemeProvider>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element
             */}
            <img
              src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YM_ID}`}
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
