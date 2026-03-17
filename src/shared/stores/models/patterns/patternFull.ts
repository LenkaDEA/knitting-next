import { normalizePattern, type PatternApi, type PatternModel } from '@/stores/models/patterns';

export type PatternFullApi = PatternApi & {
  description: string;
  videoUrl: string;
  author?: {
    documentId: string;
    username: string;
  };
};

export type PatternFullModel = PatternModel & {
  description: string;
  videoUrl: string;
  author?: {
    documentId: string;
    username: string;
  };
};

export const normalizePatternFull = (from: PatternFullApi): PatternFullModel => ({
  ...normalizePattern(from),
  description: from.description,
  videoUrl: from.videoUrl,
  author: from.author
    ? { documentId: from.author.documentId, username: from.author.username }
    : undefined,
});
