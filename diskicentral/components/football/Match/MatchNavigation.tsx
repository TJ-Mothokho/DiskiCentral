import { Tabs } from "@/components/football/Controls";

export type MatchTab = "Overview" | "Lineups" | "Stats" | "H2H";

export function getMatchTab(tab?: string): MatchTab {
  switch (tab?.toLowerCase()) {
    case "lineups":
      return "Lineups";
    case "stats":
      return "Stats";
    case "h2h":
      return "H2H";
    default:
      return "Overview";
  }
}

export function MatchNavigation({
  fixtureId,
  active,
}: {
  fixtureId: number;
  active: MatchTab;
}) {
  return (
    <Tabs
      active={active}
      items={[
        { label: "Overview", href: `/matches/${fixtureId}?tab=overview` },
        { label: "Lineups", href: `/matches/${fixtureId}?tab=lineups` },
        { label: "Stats", href: `/matches/${fixtureId}?tab=stats` },
        { label: "H2H", href: `/matches/${fixtureId}?tab=h2h` },
      ]}
    />
  );
}
