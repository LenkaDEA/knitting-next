import classNames from 'classnames';
import React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className }) => {
  const loaderSizes = {
    s: 24,
    m: 48,
    l: 60,
  };

  const sizeValue = loaderSizes[size];

  return (
    <svg
      className={classNames(styles.loader, className)}
      width={sizeValue}
      height={sizeValue}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5746 18.8206C13.4504 18.2825 12.9121 17.9562 12.3609 17.9901C9.48718 18.1667 6.82285 16.2479 6.15374 13.3497C5.40832 10.1209 7.42148 6.89919 10.6503 6.15377C13.5485 5.48466 16.441 7.03821 17.542 9.6985C17.7532 10.2088 18.2824 10.5496 18.8206 10.4253C19.3587 10.3011 19.7001 9.76048 19.5104 9.24181C18.1438 5.50621 14.1761 3.28716 10.2004 4.20503C5.89532 5.19893 3.21111 9.49456 4.205 13.7996C5.12287 17.7753 8.85667 20.3687 12.8133 19.9594C13.3626 19.9026 13.6989 19.3587 13.5746 18.8206Z" />
    </svg>
  );
};

export default Loader;
