'use client';

import { useRouter } from 'next/navigation';

import Text from '@/components/Text';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';

import styles from './GoBack.module.scss';

const GoBack: React.FC = () => {
  const router = useRouter();

  return (
    <div
      className={styles.goBack}
      onClick={() => {
        router.back();
      }}
    >
      <ArrowDownIcon className={styles.goBack__icon} color="accent" />
      <Text view="p-l" color="accent" weight="medium">
        Назад
      </Text>
    </div>
  );
};

export default GoBack;
