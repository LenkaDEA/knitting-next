import type { ToolValue } from '@/shared/config/meta';

export type CreatePatternApi = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  cover?: File | null;
  tool: ToolValue;
  videoUrl: string;
};

export type CreatePatternModel = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  cover?: File | null;
  tool: ToolValue;
  videoUrl: string;
};

export const normalizeCreatePattern = (from: CreatePatternApi): CreatePatternModel => ({
  slug: from.slug,
  title: from.title,
  shortDescription: from.shortDescription,
  description: from.description,
  cover: from.cover,
  tool: from.tool,
  videoUrl: from.videoUrl,
});
