import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { CATEGORIES_ENDPOINT } from '@/config/apiUrls';
import { Meta, type MetaType } from '@/config/meta';
import { HTTPMethod, type IApiStore } from '@/stores/global/ApiStore';
import type { ILocalStore } from '@/stores/interfaces';
import type { StrapiResponse } from '@/stores/models';
import {
  normalizeCategories,
  type CategoriesApi,
  type CategoriesModel,
} from '@/stores/models/categories';

import type { GetCategoriesParams, ICategoriesStore } from './types';

type PRIVATE_FIELDS_CATEGORIES = '_data' | '_meta';

class CategoriesStore implements ICategoriesStore, ILocalStore {
  private readonly _apiStore: IApiStore;
  private _meta: MetaType = Meta.initial;
  private _data: CategoriesModel[] = [];

  constructor(apiStore: IApiStore) {
    this._apiStore = apiStore;
    makeObservable<CategoriesStore, PRIVATE_FIELDS_CATEGORIES>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      meta: computed,
      getCategories: action,
      destroy: action,
    });
  }

  get data(): CategoriesModel[] {
    return this._data;
  }

  get meta(): MetaType {
    return this._meta;
  }

  hydrate(data?: CategoriesModel[]) {
    if (!data) return;
    runInAction(() => {
      this._data = data;
      this._meta = Meta.success;
    });
  }

  async getCategories(params: GetCategoriesParams): Promise<void> {
    try {
      runInAction(() => {
        this._meta = Meta.loading;
      });

      const response = await this._apiStore.request<StrapiResponse<CategoriesApi[]>>({
        method: HTTPMethod.GET,
        data: {},
        headers: {},
        endpoint: CATEGORIES_ENDPOINT,
        cache: params.cache,
        next: params.next,
      });

      runInAction(() => {
        if (response.success) {
          this._data = response.data.data.map(normalizeCategories);
          this._meta = Meta.success;
        } else {
          this._meta = Meta.error;
        }
      });
    } catch {
      runInAction(() => {
        this._meta = Meta.error;
      });
    }
  }

  destroy(): void {
    this._data = [];
    this._meta = Meta.initial;
  }
}

export default CategoriesStore;
