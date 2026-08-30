export type GetAllPlayersResponse = {
  success: boolean;
  message: string;
  data: Player[];
  errors: string[];
};

export type GetPlayerResponse = {
  success: boolean;
  message: string;
  data: Player;
  errors: string[];
};

export type Player = {
  id: string;
  currentTeamId: string;
  name: "string";
  slug: "string";
  nationality: string | null;
  position: number;
  birthDate: string;
  photo: string | null;
  abroad: boolean;
  biography: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
  teamName: string | null;
};

export type AddPlayer = {
  currentTeamId: string;
  name: string;
  slug: string;
  nationality: string | null;
  position: number;
  birthDate: string;
  photo: string | null;
  abroad: boolean;
  biography: string | null;
  rating: number;
};

export type UpdatePlayer = {
  currentTeamId: string | null;
  name: string | null;
  slug: string | null;
  nationality: string | null;
  position: boolean | null;
  birthDate: string | null;
  photo: string | null;
  abroad: boolean | null;
  biography: string | null;
  rating: number | null;
};
