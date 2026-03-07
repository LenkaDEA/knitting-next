import classNames from 'classnames';
import React, { type ElementType, type ReactNode } from 'react';

import styles from './Container.module.scss';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  tag?: ElementType;
};

const Container: React.FC<ContainerProps> = ({ children, className = '', tag: Tag = 'div' }) => {
  return <Tag className={classNames(styles.container, className)}>{children}</Tag>;
};

export default Container;
