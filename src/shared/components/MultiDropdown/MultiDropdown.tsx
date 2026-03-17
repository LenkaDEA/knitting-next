import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

import Input from '../Input';
import Text from '../Text';
import ArrowDownIcon from '../icons/ArrowDownIcon';

import styles from './MultiDropdown.module.scss';

const listVariants = {
  hidden: { opacity: 0, y: -8, scaleY: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.2, ease: 'easeOut' as const, staggerChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -8,
    scaleY: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  /** Дополнительный classname */
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const rootRef = useRef<HTMLDivElement>(null);

  const handleSelectValue = (option: Option) => {
    const newValue: Option[] = value.some((i) => i.key === option.key)
      ? value.filter((i) => i.key !== option.key)
      : [...value, option];

    onChange(newValue);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={classNames(className, styles.multiDropdown)} ref={rootRef}>
      <Input
        value={isOpen || value.length === 0 ? searchQuery : value.length > 0 ? getTitle(value) : ''}
        placeholder={getTitle(value)}
        onChange={(text) => {
          setSearchQuery(text);
        }}
        disabled={disabled}
        onClick={() => {
          if (!disabled && !isOpen) setOpen(true);
        }}
        afterSlot={
          <ArrowDownIcon
            className={classNames(styles.multiDropdown__icon, {
              [styles[`multiDropdown__icon_isOpen`]]: isOpen,
            })}
            color="secondary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (!disabled) setOpen((prev) => !prev);
            }}
          />
        }
      />

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.ul
            className={classNames(styles.multiDropdown__optionsList)}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ originY: 0 }}
          >
            {options
              .filter((item) => item.value.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => {
                const isSelected = value.some((i) => i.key === item.key);
                return (
                  <motion.li
                    className={classNames(styles.multiDropdown__option)}
                    key={item.key}
                    variants={itemVariants}
                    onClick={() => {
                      handleSelectValue(item);
                    }}
                  >
                    <Text view="p-m" color={isSelected ? 'accent' : 'primary'}>
                      {item.value}
                    </Text>
                  </motion.li>
                );
              })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiDropdown;
