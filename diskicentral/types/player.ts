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
  apiId: number | null;
  fotmobLink: string | null;
  currentTeamId: string;
  name: string;
  slug: string;
  nationality: string | null;
  position: number;
  birthDate: string;
  photo: string | null;
  photoMimeType: string | null;
  abroad: boolean;
  biography: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
  teamName: string | null;
};

export type AddPlayer = {
  apiId: number | null;
  fotmobLink: string | null;
  currentTeamId: string;
  name: string;
  slug: string;
  nationality: string | null;
  position: PlayerPosition;
  birthDate: string;
  photo: File | null;
  abroad: boolean;
  biography: string | null;
  rating: number;
};

export type UpdatePlayer = {
  apiId: number | null;
  fotmobLink: string | null;
  currentTeamId: string | null;
  name: string | null;
  slug: string | null;
  nationality: string | null;
  position: PlayerPosition | null;
  birthDate: string | null;
  photo: File | null;
  abroad: boolean | null;
  biography: string | null;
  rating: number | null;
};

export enum PlayerPosition {
  Goalkeeper = 0,
  Defender = 1,
  Midfielder = 2,
  Forward = 3
}