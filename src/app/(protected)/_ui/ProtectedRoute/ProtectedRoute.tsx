'use client';

import { observer } from 'mobx-react-lite';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import PageLoader from '@/components/PageLoader';
import { ROUTES } from '@/shared/config/routes';
import { useRootStore } from '@/stores/context/RootContext';

const ProtectedRoute: React.FC<{ children: ReactNode }> = observer(({ children }) => {
  const { userStore } = useRootStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (userStore.checkedAuth && !userStore.isAuth) {
      router.replace(`${ROUTES.LOGIN}?from=${encodeURIComponent(pathname)}`);
    }
  }, [userStore.checkedAuth, userStore.isAuth, router, pathname]);

  if (!userStore.checkedAuth) {
    return <PageLoader />;
  }

  if (!userStore.isAuth) {
    return null;
  }

  return <>{children}</>;
});

export default ProtectedRoute;
