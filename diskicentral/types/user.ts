export type User = {
  id: string;
  name: string;
  email: string;
  role: string | number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddUser = {
  name: string;
  email: string;
  password: string;
  role: string | number;
};

export type UpdateUser = {
  name: string | null;
  role: string | number | null;
  active: boolean | null;
};

export type GetAllUsersResponse = {
  success: boolean;
  message: string;
  data: User[];
  errors: string[];
};

export type GetUserResponse = {
  success: boolean;
  message: string;
  data: User;
  errors: string[];
};
