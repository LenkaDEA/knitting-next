import classNames from 'classnames';
import React from 'react';

import Loader from '../Loader';
import Text from '../Text';

import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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

  return (
    <button
      {...props}
      className={classNames(
        className,
        styles.button,
        isDisabledByLoading && styles['button__disabled-by-loading']
      )}
      disabled={disabled || loading}
    >
      {loading && (
        <div className={styles.button__loaderWrapper}>
          <Loader size="s" className={styles.button__loader} />
        </div>
      )}
      <span className={classNames(styles.button__text, loading && styles.button__text_hidden)}>
        <Text view="button">{children}</Text>
      </span>
    </button>
  );
};

export default Button;
