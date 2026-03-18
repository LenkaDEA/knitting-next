'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import Text from '@/components/Text';
import imgCat from '@/public/NotFound-cat.png';
import { ROUTES } from '@/shared/config/routes';

import styles from './not-found.module.scss';

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace(ROUTES.HOME);
  };

  return (
    <div className={styles.notFound}>
      <Text className={styles.notFound__text404} weight="bold" color="accent">
        404
      </Text>
      <Text view="title" weight="bold" color="accent">
        Страница не найдена
      </Text>
      <Image className={styles.notFound__img} src={imgCat} alt="Грустный котик" />
      <Text view="p-l" weight="medium" color="accent">
        Эта страница распустилась. Но не переживайте, мы уже беремся за спицы!
      </Text>
      <Button onClick={handleGoHome}>Вернуться к началу вязания</Button>
    </div>
  );
};

export default NotFound;
