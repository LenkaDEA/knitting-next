import { normalizePattern, type PatternApi, type PatternModel } from '@/stores/models/patterns';

export type PatternFullApi = PatternApi & {
  description: string;
  videoUrl: string;
};

export type PatternFullModel = PatternModel & {
  description: string;
  videoUrl: string;
};

export const normalizePatternFull = (from: PatternFullApi): PatternFullModel => ({
  ...normalizePattern(from),
  description: from.description,
  videoUrl: from.videoUrl,
});
