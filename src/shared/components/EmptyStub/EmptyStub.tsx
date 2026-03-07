import Image from 'next/image';
import type { ReactNode } from 'react';

import Text from '@/components/Text';
import emptyStub from '@/public/emptyStub.png';

import styles from './EmptyStub.module.scss';

export type EmptyStubProps = {
  text: string;
  action?: ReactNode;
};

const EmptyStub: React.FC<EmptyStubProps> = ({ text, action }) => {
  return (
    <div className={styles.emptyStub}>
      <Text view="p-xl" color="accent" weight="bold">
        {text}
      </Text>
      <Image className={styles.emptyStub__img} src={emptyStub} alt={'Котик у пустой корзины'} />

      {action}
    </div>
  );
};

export default EmptyStub;
