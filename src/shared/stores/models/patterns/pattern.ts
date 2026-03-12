import { normalizeCover, type CoverApi, type CoverModel } from '@/stores/models/patterns';

export type PatternApi = {
  documentId: string;
  slug: string;
  title: string;
  shortDescription: string;
  cover?: CoverApi;
  tool: string;
};

export type PatternModel = {
  documentId: string;
  slug: string;
  title: string;
  shortDescription: string;
  cover?: CoverModel;
  tool: string;
};

export const normalizePattern = (from: PatternApi): PatternModel => ({
  documentId: from.documentId,
  slug: from.slug,
  title: from.title,
  shortDescription: from.shortDescription,
  cover: from.cover ? normalizeCover(from.cover) : undefined,
  tool: from.tool,
});
