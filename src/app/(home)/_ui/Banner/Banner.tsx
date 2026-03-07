import Text from '@/components/Text';

import styles from './Banner.module.scss';

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <Text view="p-xl" weight="bold" color="accent">
        Свяжи свою мечту: от первого накида до идеального воплощения
      </Text>
    </div>
  );
};

export default Banner;
