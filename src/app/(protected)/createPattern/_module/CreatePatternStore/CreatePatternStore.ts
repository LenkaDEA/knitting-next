import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { Meta, TOOLS, type MetaType } from '@/config/meta';
import { PATTERNS_ENDPOINT } from '@/shared/config/apiUrls';
import { authService } from '@/shared/services';
import type { StrapiResponse } from '@/shared/stores/models';
import {
  normalizeCreatePattern,
  type CreatePatternApi,
  type CreatePatternModel,
} from '@/shared/stores/models/patterns/patternCreate';
import { HTTPMethod, type IApiStore } from '@/stores/global/ApiStore';
import type { ILocalStore } from '@/stores/interfaces';

import type { ICreatePatternStore } from '.';

type PRIVATE_FIELDS_CREATE_PATTERNS = '_data' | '_meta';

class CreatePatternStore implements ICreatePatternStore, ILocalStore {
  private readonly _apiStore: IApiStore;
  private _meta: MetaType = Meta.initial;
  private _data: CreatePatternModel = {
    slug: '',
    title: '',
    shortDescription: '',
    // cover: null,
    tool: TOOLS.hook,
    description: '',
    videoUrl: '',
  };

  constructor(apiStore: IApiStore, initialData?: CreatePatternModel) {
    this._apiStore = apiStore;

    if (initialData) {
      this._data = initialData;
      this._meta = Meta.success;
    }
    makeObservable<CreatePatternStore, PRIVATE_FIELDS_CREATE_PATTERNS>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      meta: computed,
      updateData: action,
      destroy: action,
    });
  }

  get data(): CreatePatternModel {
    return this._data;
  }

  get meta(): MetaType {
    return this._meta;
  }

  updateData(newData: Partial<CreatePatternModel>): void {
    this._data = { ...this._data, ...newData };
  }

  async postCreatePattern(): Promise<void> {
    const token = authService.getToken();

    try {
      runInAction(() => {
        this._meta = Meta.loading;
      });

      const response = await this._apiStore.request<StrapiResponse<CreatePatternApi>>({
        method: HTTPMethod.POST,
        data: {
          data: this._data,
        },
        headers: {},
        endpoint: `${PATTERNS_ENDPOINT}`,
      });

      console.log(response, token);

      runInAction(() => {
        if (response.success) {
          this._data = normalizeCreatePattern(response.data.data);
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
    //todo
  }
}

export default CreatePatternStore;
