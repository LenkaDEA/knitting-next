import classNames from 'classnames';
import { motion } from 'motion/react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import React from 'react';

import Text from '../Text';

import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string | StaticImageData;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => {
  return (
    <motion.div
      className={classNames(className, styles.card)}
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
    >
      <Image
        src={image}
        alt={'Фотография готового изделия'}
        width={400}
        height={400}
        className={classNames(styles.card__picture)}
      />

      <div className={classNames(styles.card__body)}>
        <div className={classNames(styles.card__info)}>
          {captionSlot && (
            <Text view="p-s" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text view="p-xl" maxLines={2}>
            {title}
          </Text>
          <Text view="p-m" color="secondary" maxLines={3}>
            {subtitle}
          </Text>
        </div>

        <div className={classNames(styles.card__buy)}>
          {contentSlot && (
            <Text view="p-l" weight="bold">
              {contentSlot}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
