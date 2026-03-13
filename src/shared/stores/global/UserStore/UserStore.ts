import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_FAVORITES_ENDPOINT,
  USER_PROFILE_ENDPOINT,
} from '@/config/apiUrls';
import { Meta, type MetaType } from '@/config/meta';
import { authService } from '@/services/auth.service';
import { HTTPMethod } from '@/stores/global/ApiStore';
import type { RootStore } from '@/stores/global/RootStore';
import type {
  GetLikePatternParams,
  GetUserLoginParams,
  GetUserRegistrationParams,
  ILoginStore,
} from '@/stores/global/UserStore';
import {
  normalizeAuthUser,
  normalizeLoginUser,
  type UserAuthApi,
  type UserLoginApi,
  type UserModel,
} from '@/stores/models/user';

type PRIVATE_FIELDS_USER = '_data' | '_authMeta' | '_likeMeta' | '_isAuth' | '_checkedAuth';

const initialUser = { documentId: '', username: '', email: '', jwt: '' };

class UserStore implements ILoginStore {
  private readonly _rootStore: RootStore;
  private _authMeta: MetaType = Meta.initial;
  private _likeMeta: MetaType = Meta.initial;
  private _data: UserModel = initialUser;
  private _isAuth = false;
  private _checkedAuth = false;

  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable<UserStore, PRIVATE_FIELDS_USER>(this, {
      _data: observable.ref,
      _authMeta: observable,
      _likeMeta: observable,
      _isAuth: observable,
      _checkedAuth: observable,
      data: computed,
      authMeta: computed,
      likeMeta: computed,
      isAuth: computed,
      checkedAuth: computed,
      logout: action,
      destroy: action,
    });
  }

  get data(): UserModel {
    return this._data;
  }

  get authMeta(): MetaType {
    return this._authMeta;
  }

  get likeMeta(): MetaType {
    return this._likeMeta;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get checkedAuth(): boolean {
    return this._checkedAuth;
  }

  async getRegistration(params: GetUserRegistrationParams): Promise<boolean> {
    runInAction(() => {
      if (this._authMeta === Meta.loading) return false;
    });

    try {
      runInAction(() => {
        this._authMeta = Meta.loading;
      });

      const response = await this._rootStore.apiStore.request<UserLoginApi>({
        method: HTTPMethod.POST,
        data: {
          username: params.userName,
          email: params.email,
          password: params.password,
        },
        headers: {},
        endpoint: REGISTER_ENDPOINT,
      });
      return runInAction(() => {
        if (response.success) {
          this._data = normalizeLoginUser(response.data);
          authService.setToken(response.data.jwt);
          this._isAuth = true;
          this._authMeta = Meta.success;
          return true;
        } else {
          this._authMeta = Meta.error;
          return false;
        }
      });
    } catch {
      runInAction(() => {
        this._authMeta = Meta.error;
      });
      return false;
    }
  }

  async getLogin(params: GetUserLoginParams): Promise<boolean> {
    runInAction(() => {
      if (this._authMeta === Meta.loading) return false;
    });

    try {
      runInAction(() => {
        this._authMeta = Meta.loading;
      });

      const response = await this._rootStore.apiStore.request<UserLoginApi>({
        method: HTTPMethod.POST,
        data: {
          identifier: params.email,
          password: params.password,
        },
        headers: {},
        endpoint: LOGIN_ENDPOINT,
      });

      return runInAction(() => {
        if (response.success) {
          this._data = normalizeLoginUser(response.data);
          authService.setToken(response.data.jwt);
          this._isAuth = true;
          this._authMeta = Meta.success;
          return true;
        } else {
          this._authMeta = Meta.error;
          return false;
        }
      });
    } catch {
      runInAction(() => {
        this._authMeta = Meta.error;
      });
      return false;
    }
  }

  async checkAuth() {
    const token = authService.getToken();

    if (!token) {
      this.destroy();
      runInAction(() => {
        this._checkedAuth = true;
      });
      return;
    }

    try {
      runInAction(() => {
        this._authMeta = Meta.loading;
      });

      const response = await this._rootStore.apiStore.request<UserAuthApi>({
        method: HTTPMethod.GET,
        data: {
          populate: {
            favorites: {
              filters: {
                publishedAt: { $notNull: true },
              },
              populate: '*',
            },
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        endpoint: USER_PROFILE_ENDPOINT,
      });

      runInAction(() => {
        if (response.success) {
          this._data = normalizeAuthUser(response.data, token || '');
          this._authMeta = Meta.success;
          this._isAuth = true;
        } else {
          this.logout();
          this._authMeta = Meta.error;
        }
      });
    } catch {
      runInAction(() => {
        this._authMeta = Meta.error;
      });
    } finally {
      runInAction(() => {
        this._checkedAuth = true;
      });
    }
  }

  async likePattern(params: GetLikePatternParams): Promise<void> {
    const token = authService.getToken();
    runInAction(() => {
      if (this._likeMeta === Meta.loading) return;
    });

    try {
      runInAction(() => {
        this._likeMeta = Meta.loading;
      });

      const response = await this._rootStore.apiStore.request<{
        success: boolean;
        isFavorite: boolean;
      }>({
        method: HTTPMethod.POST,
        data: {
          patternId: params.pattern.documentId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        endpoint: USER_FAVORITES_ENDPOINT,
      });

      runInAction(() => {
        const currentFavorites = this._data.favorites || [];
        let newFavorites;

        if (response.success) {
          if (response.data.isFavorite) {
            newFavorites = [...currentFavorites, params.pattern];
          } else {
            newFavorites = currentFavorites.filter(
              (fav) => fav.documentId !== params.pattern.documentId
            );
          }

          this._data = {
            ...this._data,
            favorites: newFavorites,
          };
          this._likeMeta = Meta.success;
        } else {
          this._likeMeta = Meta.error;
        }
      });
    } catch {
      runInAction(() => {
        this._likeMeta = Meta.error;
      });
    }
  }

  isFavorite(documentId: string): boolean {
    return this._data.favorites?.some((i) => i.documentId === documentId) || false;
  }

  logout() {
    authService.removeToken();
    this.destroy();
    this._checkedAuth = true;
  }

  destroy() {
    this._authMeta = Meta.initial;
    this._likeMeta = Meta.initial;
    this._data = initialUser;
    this._isAuth = false;
    this._checkedAuth = false;
  }
}

export default UserStore;
