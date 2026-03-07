import Image from 'next/image';
import Link from 'next/link';

import Container from '@/app/_ui/Container';
import Text from '@/components/Text';
import UserIcon from '@/components/icons/UserIcon';
import logo from '@/public/Logo-white.svg';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.header__body}>
        <div className={styles.header__logo}>
          <Image src={logo} alt={'Логотип сайта'} width={36} height={36} />
          <Text view="p-xl" weight="bold" color="inverse">
            Knitting
          </Text>
        </div>

        <div className={styles.header__navigation}>
          <Link href="/" className="routLink">
            <Text
              view="p-m"
              color="inverse"
              weight="bold"
              className={styles[`header__navigation-text`]}
            >
              Все схемы
            </Text>
          </Link>

          <Link href="/about" className="routLink">
            <Text
              view="p-m"
              color="inverse"
              weight="bold"
              className={styles[`header__navigation-text`]}
            >
              Обо мне
            </Text>
          </Link>
        </div>

        <div className={styles.header__user}>
          <Link className="routLink" href={'/profile'}>
            <UserIcon color="inverse" />
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;
