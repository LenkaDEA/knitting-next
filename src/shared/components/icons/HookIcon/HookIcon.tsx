import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const HookIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, className, ...props }) => {
  return (
    <Icon className={className} color={color} width={width} height={height} {...props}>
      <path
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        d="M11.4641 14.3923L8.4641 19.5885C8.13077 20.1658 7.11769 21.1205 5.73205 20.3205C4.34641 19.5205 4.66667 18.1658 5 17.5885M11.9641 13.5263C11.0075 12.974 10.6798 11.7508 11.2321 10.7942L14.7321 4.73205C15.2843 3.77547 16.5075 3.44772 17.4641 4C18.4207 4.55228 18.7484 5.77547 18.1962 6.73205L14.6962 12.7942C14.1439 13.7508 12.9207 14.0786 11.9641 13.5263Z"
      />
    </Icon>
  );
};

export default HookIcon;
