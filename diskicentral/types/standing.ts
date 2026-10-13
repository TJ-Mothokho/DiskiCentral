export type StandingsResponse = {
  success: boolean;
    message: string;
    data: Data;
    errors: object[];
}

interface Legend {
    title: string;
    tKey: string;
    color: string;
    indices: int[];
}

interface Standings {
    name: string;
    shortName: string;
    id: number;
    pageUrl: string;
    deduction: object | null;
    ongoing: object | null;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    scoresStr: string;
    goalConDiff: number;
    pts: number;
    idx: number;
    qualColor: string;
}

interface Home {
    name: string;
    shortName: string;
    id: number;
    pageUrl: string;
    deduction: object | null;
    ongoing: object | null;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    scoresStr: string;
    goalConDiff: number;
    goalsScored: number;
    pts: number;
    idx: number;
    qualColor: string;
}

interface Away {
    name: string;
    shortName: string;
    id: number;
    pageUrl: string;
    deduction: object | null;
    ongoing: object | null;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    scoresStr: string;
    goalConDiff: number;
    goalsScored: number;
    pts: number;
    idx: number;
    qualColor: string;
}

interface Data {
    source: string;
    sourceUrl: object | null;
    leagueId: object | null;
    leagueName: object | null;
    season: string;
    pageUrl: object | null;
    legend: Legend[];
    standings: Standings[];
    home: Home[];
    away: Away[];
    ongoing: object[];
}
