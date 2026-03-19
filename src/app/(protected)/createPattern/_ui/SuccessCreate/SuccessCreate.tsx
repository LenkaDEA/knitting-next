'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import imgCat from '@/public/happyCat.png';
import Button from '@/shared/components/Button';
import Text from '@/shared/components/Text';
import { ROUTES } from '@/shared/config/routes';

import styles from './SuccessCreate.module.scss';

const SuccessCreate: React.FC = () => {
  const router = useRouter();
  return (
    <div className={styles.successCreate}>
      <Text color="accent" view="title" weight="bold">
        Урок успешно создан
      </Text>
      <Image
        className={styles.successCreate__img}
        src={imgCat}
        alt="Счастливый котик"
        width={400}
        height={400}
      />
      <Text color="secondary" view="p-m">
        Урок появится на платформе в течение одной минуты. Спасибо за Ваш вклад!
      </Text>
      <div className={styles.successCreate__actions}>
        <Button onClick={() => router.refresh()}>Создать еще урок</Button>
        <Button onClick={() => router.push(ROUTES.HOME)}>На главную</Button>
      </div>
    </div>
  );
};

export default SuccessCreate;
