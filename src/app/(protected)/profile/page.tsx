'use client';

import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import defaultUser from '@/public/defaultUser.png';
import { ROUTES } from '@/shared/config/routes';
import { AnalyticsEvent } from '@/shared/stores/models/analytics';
import { useRootStore } from '@/stores/context/RootContext';

import Favorites from './_ui/Favorites';
import styles from './page.module.scss';

const UserProfile: React.FC = observer(() => {
  const { userStore, analyticsStore } = useRootStore();

  const router = useRouter();

  const handleCreatePattern = () => {
    router.replace(ROUTES.CREATE_PATTERN);
    analyticsStore.sendEvent(AnalyticsEvent.clickCreatePattern, {
      userDocumentId: userStore.data.documentId,
      userName: userStore.data.username,
    });
  };

  const handleLogout = () => {
    analyticsStore.sendEvent(AnalyticsEvent.clickLogout, {
      userDocumentId: userStore.data.documentId,
      userName: userStore.data.username,
    });
    userStore.logout();
  };

  useEffect(() => {
    userStore.checkAuth();
  }, [userStore]);

  return (
    <div className={styles.profile}>
      <div className={styles.profile__body}>
        <Image alt={'Фотография изделия'} src={defaultUser} className={styles.profile__mainPhoto} />
        <div className={styles.profile__info}>
          <div className={styles.profile__subtitle}>
            <Text view="p-l" color="secondary">
              Имя пользователя
            </Text>
            <Text view="title" color="accent" weight="bold">
              {userStore.data.username}
            </Text>
          </div>

          <div className={styles.profile__subtitle}>
            <Text view="p-l" color="secondary">
              Почта
            </Text>
            <Text view="title" color="accent" weight="bold">
              {userStore.data.email}
            </Text>
          </div>

          <div className={styles.profile__actions}>
            <Button onClick={handleCreatePattern}>Создать урок</Button>
            <Button onClick={handleLogout}>Выйти</Button>
          </div>
        </div>
      </div>

      <Favorites patterns={userStore.data.favorites} />
    </div>
  );
});

export default UserProfile;
