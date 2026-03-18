import imageCompression from 'browser-image-compression';
import { action, computed, makeObservable, observable, runInAction, toJS } from 'mobx';

import { Meta, TOOLS, type MetaType } from '@/config/meta';
import { PATTERNS_ENDPOINT } from '@/shared/config/apiUrls';
import { authService } from '@/shared/services';
import type { StrapiResponse } from '@/shared/stores/models';
import {
  type CreatePatternApi,
  type CreatePatternModel,
} from '@/shared/stores/models/patterns/patternCreate';
import { HTTPMethod, type IApiStore } from '@/stores/global/ApiStore';
import type { ILocalStore } from '@/stores/interfaces';

import type { ICreatePatternStore } from '.';

type PRIVATE_FIELDS_CREATE_PATTERNS = '_data' | '_meta';

const initialCreatePatternData: CreatePatternModel = {
  slug: '',
  title: '',
  shortDescription: '',
  cover: null,
  tool: TOOLS.hook.key,
  description: '',
  videoUrl: '',
};

class CreatePatternStore implements ICreatePatternStore, ILocalStore {
  private readonly _apiStore: IApiStore;
  private _meta: MetaType = Meta.initial;
  private _data: CreatePatternModel = initialCreatePatternData;

  constructor(apiStore: IApiStore) {
    this._apiStore = apiStore;
    makeObservable<CreatePatternStore, PRIVATE_FIELDS_CREATE_PATTERNS>(this, {
      _data: observable.ref,
      _meta: observable,
      data: computed,
      meta: computed,
      updateData: action,
      resetMeta: action,
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

  resetMeta(): void {
    if (this._meta === Meta.error) {
      this._meta = Meta.initial;
    }
  }

  checkIsValid(): boolean {
    const { title, shortDescription, description } = this._data;

    return title.trim() !== '' && shortDescription.trim() !== '' && description.trim() !== '';
  }

  async postCreatePattern(): Promise<'success' | 'empty_data' | 'bad_request' | 'big_size_file'> {
    if (!this.checkIsValid()) {
      runInAction(() => {
        this._meta = Meta.error;
      });
      return 'empty_data';
    }

    const token = authService.getToken();

    try {
      runInAction(() => {
        this._meta = Meta.loading;
      });

      const { cover, ...restData } = toJS(this._data);
      const formData = new FormData();
      formData.append('data', JSON.stringify(restData));

      if (cover) {
        const FILE_SIZE_LIMIT = 15 * 1024 * 1024;
        const MIN_SIZE_FOR_COMPRESSION = 200 * 1024;

        if (cover.size > FILE_SIZE_LIMIT) {
          return 'big_size_file';
        }

        if (cover.size < MIN_SIZE_FOR_COMPRESSION) {
          formData.append('files.cover', cover, cover.name || 'cover.jpeg');
        } else {
          try {
            const options = {
              maxSizeMB: 0.3,
              maxWidthOrHeight: 1200,
              useWebWorker: true,
              initialQuality: 0.8,
            };

            const compressedFile = await imageCompression(cover, options);

            const fileName = cover.name || 'cover.jpeg';
            formData.append('files.cover', compressedFile, fileName);
          } catch {
            formData.append('files.cover', cover);
          }
        }
      }

      const response = await this._apiStore.request<StrapiResponse<CreatePatternApi>>({
        method: HTTPMethod.POST,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
        endpoint: `${PATTERNS_ENDPOINT}`,
      });

      return runInAction(() => {
        if (response.success) {
          this._meta = Meta.success;
          return 'success';
        } else {
          this._meta = Meta.error;
          return 'bad_request';
        }
      });
    } catch {
      runInAction(() => {
        this._meta = Meta.error;
      });
      return 'bad_request';
    }
  }

  destroy(): void {
    this._data = initialCreatePatternData;
    this._meta = Meta.initial;
  }
}

export default CreatePatternStore;
