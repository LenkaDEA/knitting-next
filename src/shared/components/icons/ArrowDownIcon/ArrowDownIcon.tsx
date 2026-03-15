import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const ArrowDownIcon: React.FC<IconProps> = ({
  color,
  width = 24,
  height = 24,
  className,
  ...props
}) => {
  return (
    <Icon className={className} color={color} width={width} height={height} {...props}>
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2.5}
        fill="none"
        d="M4.07998 8.91L10.6 15.43C11.37 16.2 12.63 16.2 13.4 15.43L19.92 8.91"
      />
    </Icon>
  );
};

export default ArrowDownIcon;
