export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PATTERNS: '/patterns',
  PROFILE: '/profile',
  LOGIN: '/login',
  SING_UP: '/signup',
  CREATE_PATTERN: '/createPattern',
} as const;

export type AppRoutes = (typeof ROUTES)[keyof typeof ROUTES];

export const getPatternUrl = (documentId: string) => `${ROUTES.PATTERNS}/${documentId}`;
