export type GetCategoriesParams = {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export type ICategoriesStore = {
  getCategories(params: GetCategoriesParams): Promise<void>;
};
