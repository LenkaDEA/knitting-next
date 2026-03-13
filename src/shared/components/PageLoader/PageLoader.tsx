import Loader from '@/components/Loader';

import styles from './PageLoader.module.scss';

const PageLoader: React.FC = () => {
  return (
    <div className={styles.pageLoader}>
      <Loader size="l" />
      {/* TODO: animation */}
    </div>
  );
};

export default PageLoader;
