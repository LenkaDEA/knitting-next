export type GetPatternsParams = {
  currentPage: number;
  pageSize: number;
  searchValue: string;
  categories: string[];
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export type IPatternsStore = {
  getPatterns(params: GetPatternsParams): Promise<void>;
};
