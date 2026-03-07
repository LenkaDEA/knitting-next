import classNames from 'classnames';
import * as React from 'react';

import styles from './Text.module.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'button' | 'p-xl' | 'p-l' | 'p-m' | 'p-s';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'inverse' | 'error';
  /** Максимальное кол-во строк */
  maxLines?: number;
};

const Text: React.FC<TextProps> = ({
  view,
  tag: Tag = 'p',
  weight = 'normal',
  children,
  color,
  maxLines,
  className,
}) => {
  const textClassNames = classNames(
    className,
    styles.text,
    styles[`text__${view}`],
    styles[`text__color-${color}`],
    styles[`text__weight-${weight}`]
  );

  return (
    <Tag
      className={textClassNames}
      style={
        maxLines
          ? {
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
};

export default Text;
