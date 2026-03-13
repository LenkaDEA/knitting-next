'use client';

import classNames from 'classnames';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

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
      <button className={styles.switcher__button} onClick={() => setIsOpen(!isOpen)} type="button">
        {currentOption.icon}
      </button>
      {isOpen && (
        <div className={styles.switcher__dropdown}>
          {options.map((opt) => (
            <button
              key={opt.value}
              title={opt.label}
              className={classNames(styles.switcher__option, {
                [styles['switcher__option-active']]: theme === opt.value,
              })}
              onClick={() => {
                setTheme(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
