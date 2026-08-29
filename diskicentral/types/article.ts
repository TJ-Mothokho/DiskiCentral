export type GetAllArticlesResponse = {
  "success": boolean,
  "message": string,
  "data": Article[],
  "errors": string[]
}

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
  subtitle: string | string | null;
  excerpt: string | string | null;
  body: string;
  heroImage: string | string | null;
  thumbnail: string | string | null;
  readingTime: number;
  featured: boolean;
  trending: boolean;
  status: number;
  views: number;
  publishedAt: string | string | null;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  categoryId: string;
  teamId: string | string | null;
  authorName: string | string | null;
  categoryName: string | string | null;
  teamName: string | string | null;
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
  authorId: string;
  teamId: string | null;
  tagIds: string[];
  heroImage: string | null;
  thumbnail: string | null;
  featured: boolean;
  trending: boolean;
  status: number;
  publishedAt: string | null;
};

export type UpdateArticle = {
  title: string | null;
  slug: string | null;
  subtitle: string | null;
  excerpt: string | null;
  body: string | null;
  categoryId: string | null;
  authorId: string | null;
  teamId: string | null;
  tagIds: string[];
  heroImage: string | null;
  thumbnail: string | null;
  featured: boolean;
  trending: boolean;
  status: number;
  publishedAt: string | null;
};