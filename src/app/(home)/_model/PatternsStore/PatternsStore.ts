import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { PATTERNS_ENDPOINT } from '@/config/apiUrls';
import { Meta, type MetaType } from '@/config/meta';
import { HTTPMethod, type IApiStore } from '@/shared/stores/global/ApiStore';
import type { ILocalStore } from '@/stores/interfaces';
import type { StrapiResponse } from '@/stores/models';
import { normalizePattern, type PatternApi, type PatternModel } from '@/stores/models/patterns';

import type { GetPatternsParams, IPatternsStore } from './types';

type PRIVATE_FIELDS_PATTERNS = '_data' | '_meta';

class PatternsStore implements IPatternsStore, ILocalStore {
  private readonly _apiStore: IApiStore;
  private _meta: MetaType = Meta.initial;
  private _data: StrapiResponse<PatternModel[]> = {
    data: [],
    meta: { pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } },
  };

  constructor(apiStore: IApiStore) {
    this._apiStore = apiStore;
    makeObservable<PatternsStore, PRIVATE_FIELDS_PATTERNS>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      meta: computed,
      getPatterns: action,
      destroy: action,
    });
  }

  get data(): StrapiResponse<PatternModel[]> {
    return this._data;
  }

  get meta(): MetaType {
    return this._meta;
  }

  hydrate(data?: StrapiResponse<PatternModel[]>) {
    if (!data) return;
    runInAction(() => {
      this._data = data;
      this._meta = Meta.success;
    });
  }

  async getPatterns(params: GetPatternsParams): Promise<void> {
    try {
      runInAction(() => {
        this._meta = Meta.loading;
      });

      const response = await this._apiStore.request<StrapiResponse<PatternApi[]>>({
        method: HTTPMethod.GET,
        data: {
          populate: ['cover'],
          pagination: {
            page: params.currentPage,
            pageSize: params.pageSize,
          },
          filters: {
            title: {
              $containsi: params.searchValue,
            },
            categories: {
              slug: {
                $in: params.categories,
              },
            },
          },
        },
        headers: {},
        endpoint: PATTERNS_ENDPOINT,
        cache: params.cache,
        next: params.next,
      });

      runInAction(() => {
        if (response.success) {
          this._data = {
            data: response.data.data.map(normalizePattern),
            meta: response.data.meta,
          };
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
    this._data = {
      data: [],
      meta: { pagination: { page: 0, pageCount: 0, pageSize: 0, total: 0 } },
    };
    this._meta = Meta.initial;
  }
}

export default PatternsStore;
