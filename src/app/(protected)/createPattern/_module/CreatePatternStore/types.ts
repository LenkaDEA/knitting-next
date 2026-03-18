export type ICreatePatternStore = {
  postCreatePattern(): Promise<'success' | 'empty_data' | 'bad_request'>;
};
