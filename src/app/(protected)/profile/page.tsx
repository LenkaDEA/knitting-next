'use client';

import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useEffect } from 'react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import defaultUser from '@/public/defaultUser.png';
import { useRootStore } from '@/stores/context/RootContext';

import Favorites from './_ui/Favorites';
import styles from './page.module.scss';

const UserProfile: React.FC = observer(() => {
  const { userStore } = useRootStore();

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
            <Button
              onClick={() => {
                userStore.logout();
              }}
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <Favorites patterns={userStore.data.favorites} />
    </div>
  );
});

export default UserProfile;
