export type Author = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar: string | null;
  twitter: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AddAuthor = {
  userId: string;
  name: string;
  slug: string;
  bio: string | null;
  avatar: string | null;
  twitter: string | null;
};

export type UpdateAuthor = {
  name: string | null;
  slug: string | null;
  bio: string | null;
  avatar: string | null;
  twitter: string | null;
};

export type GetAllAuthorsResponse = {
  success: boolean;
  message: string;
  data: Author[];
  errors: string[];
};

export type GetAuthorResponse = {
  success: boolean;
  message: string;
  data: Author;
  errors: string[];
};
