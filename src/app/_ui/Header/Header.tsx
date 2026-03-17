'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Container from '@/app/_ui/Container';
import Text from '@/components/Text';
import UserIcon from '@/components/icons/UserIcon';
import logo from '@/public/Logo-white.svg';
import BurgerIcon from '@/shared/components/icons/BurgerIcon';
import { ROUTES } from '@/shared/config/routes';

import ThemeSwitcher from '../ThemeSwitcher';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentPath = (path: string) => pathname === path;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpenMenu(false);
    };

    if (isOpenMenu) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenMenu]);

  const userProfileLink = (
    <motion.span whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }}>
      <Link className="routLink" href={ROUTES.PROFILE} onClick={() => setIsOpenMenu(false)}>
        <UserIcon color="inverse" />
      </Link>
    </motion.span>
  );

  return (
    <header className={styles.header} ref={rootRef}>
      <Container className={styles.header__body}>
        <div className={styles.header__logo}>
          <Link href={ROUTES.HOME} className={classNames('routLink', styles['header__logo-link'])}>
            <Image src={logo} alt={'Логотип сайта'} width={36} height={36} />
            <Text view="p-xl" weight="bold" color="inverse">
              Knitting
            </Text>
          </Link>
        </div>
        <div className={styles.header__burgerContainer}>
          <motion.div animate={{ rotate: isOpenMenu ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <BurgerIcon
              className={classNames(styles.header__burgerMenu)}
              color="inverse"
              onClick={() => {
                setIsOpenMenu((prev) => !prev);
              }}
            />
          </motion.div>
        </div>

        {/* Desktop navigation */}
        <nav className={styles.header__navigation}>
          <Link
            href={ROUTES.HOME}
            className={classNames('routLink', styles[`header__navigation-link`], {
              [styles.header__navigation_current]: currentPath(ROUTES.HOME),
            })}
          >
            <Text view="p-m" color="inverse" weight="bold">
              Все схемы
            </Text>
          </Link>
          <Link
            href={ROUTES.ABOUT}
            className={classNames('routLink', styles[`header__navigation-link`], {
              [styles.header__navigation_current]: currentPath(ROUTES.ABOUT),
            })}
          >
            <Text view="p-m" color="inverse" weight="bold">
              Обо мне
            </Text>
          </Link>
        </nav>

        {/* Mobile navigation overlay */}
        <AnimatePresence>
          {isOpenMenu && (
            <motion.div
              className={styles.header__navigationMobile}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className={styles.header__userMobile}>
                {userProfileLink} <ThemeSwitcher />
              </div>
              <Link
                href={ROUTES.HOME}
                className={classNames('routLink', styles[`header__navigation-link`], {
                  [styles.header__navigation_current]: currentPath(ROUTES.HOME),
                })}
                onClick={() => setIsOpenMenu(false)}
              >
                <Text view="p-m" color="inverse" weight="bold">
                  Все схемы
                </Text>
              </Link>
              <Link
                href={ROUTES.ABOUT}
                className={classNames('routLink', styles[`header__navigation-link`], {
                  [styles.header__navigation_current]: currentPath(ROUTES.ABOUT),
                })}
                onClick={() => setIsOpenMenu(false)}
              >
                <Text view="p-m" color="inverse" weight="bold">
                  Обо мне
                </Text>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.header__user}>
          <ThemeSwitcher />
          {userProfileLink}
        </div>
      </Container>
    </header>
  );
};

export default Header;
