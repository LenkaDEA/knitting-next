import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const ClearIcon: React.FC<IconProps> = ({
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
        d="M19.042 3.48536C19.4325 3.09499 20.0656 3.09489 20.456 3.48536C20.8464 3.87585 20.8464 4.50894 20.456 4.89943L13.3847 11.9707L20.456 19.042C20.8463 19.4325 20.8465 20.0656 20.456 20.4561C20.0656 20.8465 19.4325 20.8463 19.042 20.4561L11.9707 13.3848L4.89939 20.4561C4.5089 20.8464 3.87582 20.8464 3.48533 20.4561C3.09485 20.0656 3.09495 19.4325 3.48533 19.042L10.5566 11.9707L3.48533 4.89943C3.09482 4.5089 3.09482 3.87588 3.48533 3.48536C3.87585 3.09484 4.50887 3.09485 4.89939 3.48536L11.9707 10.5567L19.042 3.48536Z"
      />
    </Icon>
  );
};

export default ClearIcon;
