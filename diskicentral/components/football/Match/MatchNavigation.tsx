import { Tabs } from "@/components/football/Controls";

export type MatchTab =
  | "Overview"
  | "Table"
  | "Lineups"
  | "Stats"
  | "H2H"
  | "Predictions";

export function getMatchTab(
  tab?: string,
  tableAvailable = false,
  preMatch = false,
  predictionsAvailable = false,
): MatchTab {
  switch (tab?.toLowerCase()) {
    case "table":
      return tableAvailable ? "Table" : "Overview";
    case "lineups":
      return "Lineups";
    case "stats":
      return preMatch ? "Overview" : "Stats";
    case "h2h":
      return preMatch ? "Overview" : "H2H";
    case "predictions":
      return predictionsAvailable ? "Predictions" : "Overview";
    default:
      return "Overview";
  }
}

export function MatchNavigation({
  fixtureId,
  active,
  tableAvailable,
  preMatch,
  predictionsAvailable,
}: {
  fixtureId: number;
  active: MatchTab;
  tableAvailable: boolean;
  preMatch: boolean;
  predictionsAvailable: boolean;
}) {
  return (
    <Tabs
      active={active}
      items={[
        { label: "Overview", href: `/matches/${fixtureId}?tab=overview` },
        ...(tableAvailable
          ? [{ label: "Table", href: `/matches/${fixtureId}?tab=table` }]
          : []),
        { label: "Lineups", href: `/matches/${fixtureId}?tab=lineups` },
        ...(preMatch
          ? predictionsAvailable
            ? [{ label: "Predictions", href: `/matches/${fixtureId}?tab=predictions` }]
            : []
          : [
              { label: "Stats", href: `/matches/${fixtureId}?tab=stats` },
              { label: "H2H", href: `/matches/${fixtureId}?tab=h2h` },
            ]),
      ]}
    />
  );
}
