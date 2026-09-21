import { notFound } from "next/navigation";

import TeamContent from "@/components/team/TeamContent";
import { ArticlesService } from "@/services/ArticleService";
import { FixturesService } from "@/services/FixtureService";
import { PlayersService } from "@/services/PlayerService";
import { ResultsService } from "@/services/ResultService";
import { StandingsService } from "@/services/StandingService";
import { TeamsService } from "@/services/TeamService";

export const dynamic = "force-dynamic";

export default async function TeamPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const teamsService = new TeamsService();
  const standingsService = new StandingsService();

  const teamResponse = await teamsService.getTeamBySlug(slug);
  if (!teamResponse.data) {
    notFound();
  }
  const team = teamResponse.data;

  const [articlesResponse, fixturesResponse, resultsResponse, playersResponse] =
    await Promise.all([
      ArticlesService.getApiArticles(),
      FixturesService.getFixturesByTeamId(team.id),
      ResultsService.getApiResults(),
      PlayersService.getPlayersByTeamId(team.id),
    ]);

  const fixtures = fixturesResponse.data ?? [];
  const fixtureIds = new Set(fixtures.map((fixture) => fixture.id));
  const results = (resultsResponse.data ?? []).filter((result) =>
    fixtureIds.has(result.fixtureId),
  );
  const fixtureById = new Map(fixtures.map((fixture) => [fixture.id, fixture]));

  const articles = (articlesResponse.data ?? [])
    .filter((article) => article.teamId === team.id)
    .slice(0, 6);

  const standingsByCompetition = Object.fromEntries(
    await Promise.all(
      team.competitionIds.map(async (competitionId) => {
        const response =
          await standingsService.getStandingsByCompetitionId(competitionId);
        return [competitionId, response.data ?? []] as const;
      }),
    ),
  );

  const competitions = team.competitionIds.map((id, index) => ({
    id,
    name: team.competitionNames[index] ?? "Competition",
  }));

  return (
    <TeamContent
      team={team}
      competitions={competitions}
      articles={articles}
      fixtures={fixtures}
      results={results}
      fixtureById={fixtureById}
      players={playersResponse.data ?? []}
      standingsByCompetition={standingsByCompetition}
    />
  );
}
