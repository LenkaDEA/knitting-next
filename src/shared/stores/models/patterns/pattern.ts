import { normalizeCover, type CoverApi, type CoverModel } from '@/stores/models/patterns';

export type PatternApi = {
  documentId: string;
  slug: string;
  title: string;
  shortDescription: string;
  cover?: CoverApi;
};

export type PatternModel = {
  documentId: string;
  slug: string;
  title: string;
  shortDescription: string;
  cover?: CoverModel;
};

export const normalizePattern = (from: PatternApi): PatternModel => ({
  documentId: from.documentId,
  slug: from.slug,
  title: from.title,
  shortDescription: from.shortDescription,
  cover: from.cover ? normalizeCover(from.cover) : undefined,
});
