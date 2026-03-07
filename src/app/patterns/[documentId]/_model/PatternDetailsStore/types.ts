export type GetPatternDetailsParams = {
  documentId: string;
};

export type IPatternDetailsStore = {
  getPatternDetails(params: GetPatternDetailsParams): Promise<void>;
};
