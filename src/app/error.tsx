'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import imgTangle from '@/public/Error-tangle.png';
import Button from '@/shared/components/Button';
import Text from '@/shared/components/Text';
import { ROUTES } from '@/shared/config/routes';

import styles from './not-found.module.scss';

type ErrorProps = {
  reset: () => void;
};

const Error: React.FC<ErrorProps> = ({ reset }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace(ROUTES.HOME);
  };

  return (
    <div className={styles.notFound}>
      <Text className={styles.notFound__text404} weight="bold" color="accent">
        Ой!
      </Text>

      <Text view="title" weight="bold" color="accent">
        Узелок на нитке
      </Text>

      <Image className={styles.notFound__img} src={imgTangle} alt="Запутавшиеся нитки" />

      <Text view="p-l" weight="medium" color="accent">
        Петля сорвалась, но мы уже ищем крючок, чтобы все исправить. Попробуем распутать?
      </Text>

      <div className={styles.notFound__actions}>
        <Button onClick={() => reset()}>Попробовать снова</Button>
        <Button onClick={handleGoHome}>Вернуться к началу</Button>
      </div>
    </div>
  );
};

export default Error;
