export type GetPatternsParams = {
  currentPage: number;
  pageSize: number;
  searchValue: string;
  categories: string[];
};

export type IPatternsStore = {
  getPatterns(params: GetPatternsParams): Promise<void>;
};
