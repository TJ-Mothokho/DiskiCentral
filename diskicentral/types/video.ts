export type GetAllVideosResponse = {
  success: boolean;
  message: string;
  data: Video[];
  errors: string[];
};

export type GetVideoResponse = {
  success: boolean;
  message: string;
  data: Video;
  errors: string[];
};

export type Video = {
  id: string;
  authorId: string;
  categoryId: string;
  title: string;
  slug: string;
  youtubeId: string;
  thumbnail: string | null;
  description: string | null;
  views: number;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  authorName: string | null;
  categoryName: string | null;
  embedUrl: string;
  embedCode: string;
};

export type AddVideo = {
  authorId: string;
  categoryId: string;
  title: string;
  slug: string;
  youtubeId: string;
  thumbnail: string | null;
  description: string | null;
  featured: boolean;
  publishedAt: string;
};

export type UpdateVideo = {
  authorId: string | null,
  categoryId: string | null,
  title: string | null,
  slug: string | null,
  youtubeId: string | null,
  thumbnail: string | null,
  description: string | null,
  featured: boolean | null,
  publishedAt: string | null
};
