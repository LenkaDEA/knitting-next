export type CategoriesApi = {
  documentId: string;
  name: string;
  slug: string;
};

export type CategoriesModel = {
  documentId: string;
  name: string;
  slug: string;
};

export const normalizeCategories = (from: CategoriesApi): CategoriesModel => ({
  documentId: from.documentId,
  name: from.name,
  slug: from.slug,
});
