export type Tag = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type AddTag = {
  name: string;
  slug: string;
};

export type UpdateTag = {
  name: string | null;
  slug: string | null;
};

export type GetAllTagsResponse = {
  success: boolean;
  message: string;
  data: Tag[];
  errors: string[];
};

export type GetTagResponse = {
  success: boolean;
  message: string;
  data: Tag;
  errors: string[];
};
