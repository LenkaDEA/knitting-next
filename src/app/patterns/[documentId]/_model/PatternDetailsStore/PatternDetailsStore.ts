import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { PATTERNS_ENDPOINT } from '@/config/apiUrls';
import { Meta, type MetaType } from '@/config/meta';
import { HTTPMethod, type IApiStore } from '@/stores/global/ApiStore';
import type { ILocalStore } from '@/stores/interfaces';
import type { StrapiResponse } from '@/stores/models/StrapiResponse';
import { normalizePatternFull } from '@/stores/models/patterns';
import type { PatternFullApi, PatternFullModel, PatternModel } from '@/stores/models/patterns';

import type { GetPatternDetailsParams, IPatternDetailsStore } from '.';

type PRIVATE_FIELDS_PATTERN_DETAILS = '_data' | '_meta';

class PatternDetailsStore implements IPatternDetailsStore, ILocalStore {
  private readonly _apiStore: IApiStore;
  private _meta: MetaType = Meta.initial;
  private _data: PatternFullModel = {
    documentId: '',
    slug: '',
    title: '',
    shortDescription: '',
    cover: { documentId: '', url: '', name: '' },
    tool: '',
    description: '',
    videoUrl: '',
  };

  constructor(apiStore: IApiStore, initialData?: PatternFullModel) {
    this._apiStore = apiStore;

    if (initialData) {
      this._data = initialData;
      this._meta = Meta.success;
    }
    makeObservable<PatternDetailsStore, PRIVATE_FIELDS_PATTERN_DETAILS>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      meta: computed,
      shortData: computed,
      getPatternDetails: action,
      destroy: action,
    });
  }

  get data(): PatternFullModel {
    return this._data;
  }

  get meta(): MetaType {
    return this._meta;
  }

  get shortData(): PatternModel {
    return {
      documentId: this.data.documentId,
      title: this.data.title,
      slug: this.data.slug,
      shortDescription: this.data.shortDescription,
      cover: this.data.cover,
      tool: this.data.tool,
    };
  }

  hydrate(data?: PatternFullModel) {
    if (!data) return;
    runInAction(() => {
      this._data = data;
      this._meta = Meta.success;
    });
  }

  async getPatternDetails(params: GetPatternDetailsParams): Promise<void> {
    try {
      runInAction(() => {
        this._meta = Meta.loading;
      });

      const response = await this._apiStore.request<StrapiResponse<PatternFullApi>>({
        method: HTTPMethod.GET,
        data: {
          populate: ['cover', 'author'],
        },
        headers: {},
        endpoint: `${PATTERNS_ENDPOINT}/${params.documentId}`,
      });

      runInAction(() => {
        if (response.success) {
          this._data = normalizePatternFull(response.data.data);
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
      documentId: '',
      slug: '',
      title: '',
      shortDescription: '',
      cover: { documentId: '', url: '', name: '' },
      tool: '',
      description: '',
      videoUrl: '',
    };
    this._meta = Meta.initial;
  }
}

export default PatternDetailsStore;
