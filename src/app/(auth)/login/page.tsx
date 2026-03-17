'use client';

import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { Meta } from '@/config/meta';
import { ROUTES } from '@/shared/config/routes';
import { useRootStore } from '@/stores/context/RootContext';

import styles from './page.module.scss';

const LoginForm: React.FC = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { userStore } = useRootStore();
  const router = useRouter();

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };
  const handleChangePassword = (value: string) => {
    setPassword(value);
  };
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isLogin = await userStore.getLogin({ email: email, password: password });
    if (isLogin) router.push(ROUTES.PROFILE);
  };

  return (
    <div className={classNames(styles.loginForm)}>
      <form className={styles.loginForm__body} onSubmit={handleSubmit}>
        <div className={styles.loginForm__field}>
          <label htmlFor="login-email">
            <Text view="p-xl" color="accent" weight="medium">
              Введите email или имя пользователя
            </Text>
          </label>
          <Input id="login-email" type="text" value={email} onChange={handleChangeEmail} />
        </div>

        <div className={styles.loginForm__field}>
          <label htmlFor="login-password">
            <Text view="p-xl" color="accent" weight="medium">
              Введите пароль
            </Text>
          </label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>

        {userStore.authMeta === Meta.error && <Text color="error">Неверный логин или пароль</Text>}

        <Button type="submit" disabled={userStore.authMeta === Meta.loading}>
          Войти
        </Button>
      </form>

      <Link href={ROUTES.SING_UP}>Зарегистрироваться</Link>
    </div>
  );
});
export default LoginForm;
