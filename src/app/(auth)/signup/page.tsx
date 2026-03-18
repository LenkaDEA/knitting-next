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
import { AnalyticsEvent } from '@/shared/stores/models/analytics';
import { useRootStore } from '@/stores/context/RootContext';

import styles from './layout.module.scss';

const RegisterForm: React.FC = observer(() => {
  const { userStore, analyticsStore } = useRootStore();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleChangeNickname = (value: string) => {
    setUserName(value);
  };
  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };
  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isLogin = await userStore.getRegistration({ userName, email, password });
    if (isLogin) {
      analyticsStore.sendEvent(AnalyticsEvent.registrationSuccess, {
        userDocumentId: userStore.data.username,
      });
      router.push(ROUTES.PROFILE);
    }
  };

  return (
    <div className={classNames(styles.regForm)}>
      <form className={styles.regForm__body} onSubmit={handleSubmit}>
        <div className={styles.regForm__field}>
          <label htmlFor="reg-username">
            <Text view="p-xl" color="accent" weight="medium">
              Придумайте имя пользователя
            </Text>
          </label>
          <Input id="reg-username" type="text" value={userName} onChange={handleChangeNickname} />
        </div>

        <div className={styles.regForm__field}>
          <label htmlFor="reg-email">
            <Text view="p-xl" color="accent" weight="medium">
              Введите ваш email
            </Text>
          </label>
          <Input id="reg-email" type="email" value={email} onChange={handleChangeEmail} />
        </div>

        <div className={styles.regForm__field}>
          <label htmlFor="reg-password">
            <Text view="p-xl" color="accent" weight="medium">
              Придумайте пароль
            </Text>
          </label>
          <Input
            id="reg-password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>

        {userStore.authMeta === Meta.error && (
          <Text color="error">Пользователь с таким именем или почтой уже есть</Text>
        )}

        <Button type="submit" disabled={userStore.authMeta === Meta.loading}>
          Создать аккаунт
        </Button>
      </form>
      <Link href={ROUTES.LOGIN}>У меня уже есть аккаунт</Link>
    </div>
  );
});
export default RegisterForm;
