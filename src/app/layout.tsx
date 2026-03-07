import '@/styles/styles.scss';

import { NuqsAdapter } from 'nuqs/adapters/next';

import Header from '@/app/_ui/Header';
import { RootProvider } from '@/shared/stores/context/RootContext';

import Container from './_ui/Container';
import styles from './layout.module.scss';

import '@/stores/setup';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <Container tag={'main'} className={styles.App__main}>
          <RootProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </RootProvider>
        </Container>
      </body>
    </html>
  );
}
