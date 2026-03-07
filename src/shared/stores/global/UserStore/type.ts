import type { PatternModel } from '@/stores/models/patterns';

export type GetUserRegistrationParams = {
  userName: string;
  email: string;
  password: string;
};

export type GetUserLoginParams = {
  email: string;
  password: string;
};

export type GetLikePatternParams = {
  pattern: PatternModel;
};

export type ILoginStore = {
  getRegistration(params: GetUserRegistrationParams): Promise<boolean>;
  getLogin(params: GetUserLoginParams): Promise<boolean>;
  checkAuth(): Promise<void>;
  likePattern(params: GetLikePatternParams): Promise<void>;
  logout(): void;
  destroy(): void;
};
