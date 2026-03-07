import classNames from 'classnames';
import * as React from 'react';

import styles from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'inverse';
  disabled?: boolean;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  color = 'primary',
  width,
  height,
  children,
  className,
  disabled = false,
  ...props
}) => {
  return (
    <svg
      className={classNames(
        className,
        styles.icon,
        styles[`icon__${disabled ? 'secondary' : color}`]
      )}
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
