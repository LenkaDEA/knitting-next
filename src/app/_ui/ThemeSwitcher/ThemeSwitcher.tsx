'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

import ComputerIcon from '@/shared/components/icons/ComputerIcon';
import MoonIcon from '@/shared/components/icons/MoonIcon';
import SunIcon from '@/shared/components/icons/SunIcon';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'light', label: 'Светлая тема', icon: <SunIcon color="inverse" /> },
    { value: 'dark', label: 'Темная тема', icon: <MoonIcon color="inverse" /> },
    { value: 'system', label: 'Системная тема', icon: <ComputerIcon color="inverse" /> },
  ];

  const currentOption = options.find((opt) => opt.value === theme) || options[2];

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.switcher} ref={menuRef}>
      <motion.button
        className={styles.switcher__button}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentOption.value}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            {currentOption.icon}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.switcher__dropdown}
            initial={{ opacity: 0, scale: 0.9, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{ transformOrigin: 'top right' }}
          >
            {options.map((opt, i) => (
              <motion.button
                key={opt.value}
                title={opt.label}
                className={classNames(styles.switcher__option, {
                  [styles['switcher__option-active']]: theme === opt.value,
                })}
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.01 }}
              >
                {opt.icon}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
