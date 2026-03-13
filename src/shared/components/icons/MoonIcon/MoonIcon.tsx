import * as React from 'react';

import Icon, { type IconProps } from '../Icon';

const MoonIcon: React.FC<IconProps> = ({ color, width = 24, height = 24, className, ...props }) => {
  return (
    <Icon className={className} color={color} width={width} height={height} {...props}>
      <path
        strokeWidth={0.5}
        d="M6 6.99999C6 6.37279 6.05288 5.75779 6.1543 5.15917C4.22301 6.80997 3 9.26235 3 12C3 16.9706 7.02944 21 12 21C14.7377 21 17.1883 19.7755 18.8389 17.8437C18.2409 17.9452 17.6268 18 17 18C10.9249 18 6 13.0751 6 6.99999ZM8 6.99999C8 11.9706 12.0294 16 17 16C18.3201 16 19.5714 15.7128 20.7012 15.2021C21.5414 14.8223 22.4042 15.6852 22.0244 16.5254C20.3 20.3398 16.4638 23 12 23C5.92487 23 1 18.0751 1 12C1 7.53661 3.65923 3.69923 7.47363 1.9746C8.31381 1.59477 9.17671 2.45766 8.79688 3.29784C8.2863 4.42718 8 5.67913 8 6.99999Z"
      />
    </Icon>
  );
};

export default MoonIcon;
