export type Category = {
  id: string;
  name: string;
  slug: string;
  colour: string;
  createdAt: string;
  updatedAt: string;
};

export type AddCategory = {
  name: string;
  slug: string;
  colour: string;
};

export type UpdateCategory = {
  name: string | null;
  slug: string | null;
  colour: string | null;
};

export type GetAllCategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
  errors: string[];
};

export type GetCategoryResponse = {
  success: boolean;
  message: string;
  data: Category;
  errors: string[];
};
