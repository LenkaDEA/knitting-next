import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({
  color,
  width = 24,
  height = 24,
  className,
  ...props
}) => {
  return (
    <Icon className={className} color={color} width={width} height={height} {...props}>
      <path fill="none" strokeWidth={2} d="M4 11.6129L9.87755 18L20 7" />
    </Icon>
  );
};

export default CheckIcon;
