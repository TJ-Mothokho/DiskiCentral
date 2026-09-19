export type GetAllArticlesResponse = {
  success: boolean;
  message: string;
  data: Article[];
  errors: string[];
};

export type GetArticleResponse = {
  success: boolean;
  message: string;
  data: Article;
  errors: string[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  body: string;
  heroImageMimeType: string | null;
  thumbnail: string | null;
  thumbnailMimeType: string | null;
  readingTime: number;
  featured: boolean;
  trending: boolean;
  status: number;
  views: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  personId: string | null;
  categoryId: string;
  teamId: string | null;
  personName: string | null;
  categoryName: string | null;
  teamName: string | null;
  tagIds: string[];
  relatedArticleIds: string[];
};

export type AddArticle = {
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string | null;
  body: string;
  categoryId: string;
  teamId: string | null;
  tagIds: string[];
  heroImage: File | null;
  thumbnail: File | null;
  featured: boolean;
  trending: boolean;
};

export type UpdateArticle = {
  title: string | null;
  slug: string | null;
  subtitle: string | null;
  excerpt: string | null;
  body: string | null;
  categoryId: string | null;
  personId: string | null;
  teamId: string | null;
  tagIds: string[];
  heroImage: File | null;
  thumbnail: File | null;
  featured: boolean;
  trending: boolean;
  status: number;
  publishedAt: string | null;
};
