import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const NeedlesIcon: React.FC<IconProps> = ({
  color,
  width = 24,
  height = 24,
  className,
  ...props
}) => {
  return (
    <Icon className={className} color={color} width={width} height={height} {...props}>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        d="M19.7942 5.5L12.7942 17.6244M12.7942 17.6244C11.8376 17.0721 10.6144 17.3998 10.0622 18.3564C9.50987 19.313 9.83762 20.5362 10.7942 21.0885C11.7508 21.6407 12.974 21.313 13.5263 20.3564C14.0785 19.3998 13.7508 18.1766 12.7942 17.6244ZM13.732 2L6.73202 14.1244M6.73202 14.1244C5.77544 13.5721 4.55226 13.8998 3.99997 14.8564C3.44769 15.813 3.77544 17.0362 4.73202 17.5885C5.68861 18.1407 6.91179 17.813 7.46407 16.8564C8.01636 15.8998 7.68861 14.6766 6.73202 14.1244Z"
      />
    </Icon>
  );
};

export default NeedlesIcon;
