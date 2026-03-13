export type StrapiMeta = {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

export type StrapiResponse<T> = {
  data: T;
  meta: StrapiMeta;
};
