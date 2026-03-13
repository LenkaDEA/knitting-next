import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const ComputerIcon: React.FC<IconProps> = ({
  color,
  width = 24,
  height = 24,
  className,
  ...props
}) => {
  return (
    <Icon className={className} color={color} width={width} height={height} {...props}>
      <path
        strokeWidth={0.5}
        d="M21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V13C3 13.5523 3.44772 14 4 14H20C20.5523 14 21 13.5523 21 13V4ZM23 13C23 14.6569 21.6569 16 20 16H4C2.34315 16 1 14.6569 1 13V4C1 2.34315 2.34315 1 4 1H20C21.6569 1 23 2.34315 23 4V13Z"
      />
      <path strokeWidth={0.5} d="M11 16H13V21H11V16Z" />
      <path
        strokeWidth={0.5}
        d="M4 22C4 21.4477 4.44772 21 5 21H19C19.5523 21 20 21.4477 20 22C20 22.5523 19.5523 23 19 23H5C4.44772 23 4 22.5523 4 22Z"
      />
    </Icon>
  );
};

export default ComputerIcon;
