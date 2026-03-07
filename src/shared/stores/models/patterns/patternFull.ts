import { normalizePattern, type PatternApi, type PatternModel } from '@/stores/models/patterns';

export type PatternFullApi = PatternApi & {
  tool: string;
  description: string;
  videoUrl: string;
};

export type PatternFullModel = PatternModel & {
  tool: string;
  description: string;
  videoUrl: string;
};

export const normalizePatternFull = (from: PatternFullApi): PatternFullModel => ({
  ...normalizePattern(from),
  tool: from.tool,
  description: from.description,
  videoUrl: from.videoUrl,
});
