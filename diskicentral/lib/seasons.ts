export function currentFootballSeason(now = new Date()) {
  const month = now.getMonth() + 1;
  return month >= 8 ? now.getFullYear() : now.getFullYear() - 1;
}

export function seasonStart(season: number) {
  return `${season}-08-01`;
}

export function seasonEnd(season: number) {
  return `${season + 1}-07-31`;
}

export function fixtureMonth(date: string) {
  return date.slice(0, 7);
}

export function monthOptions(season: number) {
  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(season, index + 7, 1));
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const value = `${year}-${month}`;
    return { value, label: new Intl.DateTimeFormat("en-ZA", { month: "long", year: "numeric", timeZone: "UTC" }).format(date) };
  });
}
