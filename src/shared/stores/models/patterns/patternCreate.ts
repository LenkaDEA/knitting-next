import type { ToolValue } from '@/shared/config/meta';

import { normalizeCategories, type CategoriesApi, type CategoriesModel } from '../categories';

export type CreatePatternApi = {
  slug: string;
  title: string;
  shortDescription: string;
  categories?: CategoriesApi[];
  description: string;
  cover?: File | null;
  tool: ToolValue;
  videoUrl: string;
};

export type CreatePatternModel = {
  slug: string;
  title: string;
  shortDescription: string;
  categories?: CategoriesModel[];
  description: string;
  cover?: File | null;
  tool: ToolValue;
  videoUrl: string;
};

export const normalizeCreatePattern = (from: CreatePatternApi): CreatePatternModel => ({
  slug: from.slug,
  title: from.title,
  shortDescription: from.shortDescription,
  categories:
    typeof from.categories !== 'undefined' ? from.categories.map(normalizeCategories) : [],
  description: from.description,
  cover: from.cover,
  tool: from.tool,
  videoUrl: from.videoUrl,
});
