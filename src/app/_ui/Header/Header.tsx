'use client';

import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Container from '@/app/_ui/Container';
import Text from '@/components/Text';
import UserIcon from '@/components/icons/UserIcon';
import logo from '@/public/Logo-white.svg';
import BurgerIcon from '@/shared/components/icons/BurgerIcon';

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
    <Link className="routLink" href={'/profile'} onClick={() => setIsOpenMenu(false)}>
      <UserIcon color="inverse" />
    </Link>
  );

  return (
    <header className={styles.header} ref={rootRef}>
      <Container className={styles.header__body}>
        <div className={styles.header__logo}>
          <Link href={'/'} className={classNames('routLink', styles['header__logo-link'])}>
            <Image src={logo} alt={'Логотип сайта'} width={36} height={36} />
            <Text view="p-xl" weight="bold" color="inverse">
              Knitting
            </Text>
          </Link>
        </div>
        <div className={styles.header__burgerContainer}>
          <BurgerIcon
            className={classNames(styles.header__burgerMenu)}
            color="inverse"
            onClick={() => {
              setIsOpenMenu((prev) => !prev);
            }}
          />
        </div>
        <div
          className={classNames(styles.header__navigation, {
            [styles.header__navigation_open]: isOpenMenu,
          })}
        >
          <div className={styles.header__userMobile}>{userProfileLink}</div>

          <Link
            href="/"
            className={classNames('routLink', styles[`header__navigation-link`], {
              [styles.header__navigation_current]: currentPath('/'),
            })}
            onClick={() => setIsOpenMenu(false)}
          >
            <Text view="p-m" color="inverse" weight="bold">
              Все схемы
            </Text>
          </Link>

          <Link
            href="/about"
            className={classNames('routLink', styles[`header__navigation-link`], {
              [styles.header__navigation_current]: currentPath('/about'),
            })}
            onClick={() => setIsOpenMenu(false)}
          >
            <Text view="p-m" color="inverse" weight="bold">
              Обо мне
            </Text>
          </Link>
        </div>
        <div className={styles.header__user}>{userProfileLink}</div>
      </Container>
    </header>
  );
};

export default Header;
