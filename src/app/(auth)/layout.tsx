import styles from './layout.module.scss';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={styles.authLayout}>{children}</div>;
}
