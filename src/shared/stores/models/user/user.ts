import { normalizePattern, type PatternApi, type PatternModel } from '@/stores/models/patterns';

export type UserLoginApi = {
  jwt: string;
  user: {
    documentId: string;
    username: string;
    email: string;
  };
};

export type UserModel = {
  documentId: string;
  username: string;
  email: string;
  jwt: string;
  favorites?: PatternModel[];
};

export const normalizeLoginUser = (from: UserLoginApi): UserModel => ({
  documentId: from.user.documentId,
  username: from.user.username,
  email: from.user.email,
  jwt: from.jwt,
});

export type UserAuthApi = {
  documentId: string;
  username: string;
  email: string;
  favorites: PatternApi[];
};

export const normalizeAuthUser = (from: UserAuthApi, jwt = ''): UserModel => ({
  documentId: from.documentId,
  username: from.username,
  email: from.email,
  jwt: jwt,
  favorites: typeof from.favorites !== 'undefined' ? from.favorites.map(normalizePattern) : [],
});
