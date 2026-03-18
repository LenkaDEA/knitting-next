import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/config/routes';
import { useRootStore } from '@/shared/stores/context/RootContext';
import { AnalyticsEvent } from '@/shared/stores/models/analytics';

import Button from '../Button';
import Text from '../Text';

import styles from './ModalLogin.module.scss';

export type ModalLoginProps = {
  text: string;
  description?: string;
};

const ModalLogin: React.FC<ModalLoginProps> = ({ text, description }) => {
  const router = useRouter();
  const { analyticsStore } = useRootStore();

  const handleClickLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleClickSignUp = () => {
    analyticsStore.sendEvent(AnalyticsEvent.clickSignUp, { fromLocation: 'modal' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      className={styles.modalLogin}
    >
      <Text view="p-l" weight="bold">
        {text}
      </Text>
      {description && <Text view="p-m">{description}</Text>}
      <Button onClick={handleClickLogin}>Войти</Button>
      <Link href={ROUTES.SING_UP} onClick={handleClickSignUp}>
        Зарегистрироваться
      </Link>
    </motion.div>
  );
};
export default ModalLogin;
