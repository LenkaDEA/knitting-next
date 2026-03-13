export type CoverApi = {
  documentId: string;
  name: string;
  url: string;
};

export type CoverModel = {
  documentId: string;
  name: string;
  url: string;
};

export const normalizeCover = (from: CoverApi): CoverModel => ({
  documentId: from.documentId,
  name: from.name,
  url: from.url,
});
