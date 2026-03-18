import classNames from 'classnames';
import type { HTMLMotionProps } from 'motion/react';
import { motion } from 'motion/react';
import React from 'react';

import Loader from '../Loader';
import Text from '../Text';

import styles from './Button.module.scss';

export type ButtonProps = HTMLMotionProps<'button'> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const isDisabledByLoading = loading && !disabled;
  const isInactive = disabled || loading;

  return (
    <motion.button
      {...props}
      className={classNames(
        className,
        styles.button,
        isDisabledByLoading && styles['button__disabled-by-loading']
      )}
      disabled={disabled || loading}
      whileHover={!isInactive ? { scale: 1.02 } : undefined}
      whileTap={!isInactive ? { scale: 0.95 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {loading && (
        <div className={styles.button__loaderWrapper}>
          <Loader size="s" className={styles.button__loader} />
        </div>
      )}
      <span className={classNames(styles.button__text, loading && styles.button__text_hidden)}>
        <Text view="button">{children}</Text>
      </span>
    </motion.button>
  );
};

export default Button;
