export type BooleanResponse = {
  success: boolean;
  message: string;
  data: boolean;
  errors: string[];
};

export enum CompetitionStatus {
  Upcoming = 0,
  Active = 1,
  Completed = 2,
}