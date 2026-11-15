export type FocusCompetition = {
  key: string;
  label: string;
  shortLabel: string;
  leagueId?: number;
  country: "South Africa" | "CAF";
  available: boolean;
  note?: string;
};

export const FOCUS_COMPETITIONS: FocusCompetition[] = [
  { key: "psl", label: "Premier Soccer League", shortLabel: "PSL", leagueId: 288, country: "South Africa", available: true },
  { key: "first-division", label: "1st Division", shortLabel: "1st Division", leagueId: 289, country: "South Africa", available: true },
  { key: "league-cup", label: "League Cup", shortLabel: "League Cup", leagueId: 508, country: "South Africa", available: true },
  { key: "diski-challenge", label: "Diski Challenge", shortLabel: "Diski", leagueId: 734, country: "South Africa", available: true },
  { key: "caf-champions", label: "CAF Champions League", shortLabel: "CAF CL", leagueId: 12, country: "CAF", available: true },
  { key: "caf-confederation", label: "CAF Confederation Cup", shortLabel: "CAF CC", leagueId: 20, country: "CAF", available: true },
  { key: "nedbank-cup", label: "Nedbank Cup", shortLabel: "Nedbank Cup", country: "South Africa", available: false, note: "The provider does not currently expose this competition." },
  { key: "womens-super-league", label: "Women’s Super League", shortLabel: "Women’s Super League", country: "South Africa", available: false, note: "The provider does not currently expose this competition." },
];

export const ACTIVE_FOCUS_COMPETITIONS = FOCUS_COMPETITIONS.filter((competition) => competition.available && competition.leagueId !== undefined);
export const ACTIVE_FOCUS_LEAGUE_IDS = ACTIVE_FOCUS_COMPETITIONS.flatMap((competition) => competition.leagueId ?? []);
