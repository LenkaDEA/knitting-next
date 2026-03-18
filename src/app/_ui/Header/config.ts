import { ROUTES } from '@/shared/config/routes';

export type NavItem = {
  label: string;
  href: string;
};

export const NAVIGATION_LINKS: NavItem[] = [
  { label: 'Все схемы', href: ROUTES.HOME },
  { label: 'Обо мне', href: ROUTES.ABOUT },
];
