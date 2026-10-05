import { notFound } from "next/navigation";

import TeamContent from "@/components/team/TeamContent";
import { ArticlesService } from "@/services/ArticleService";
import { FixturesService } from "@/services/FixtureService";
import { FixtureStatus } from "@/types/fixture";
import { PlayersService } from "@/services/PlayerService";
import { StandingsService } from "@/services/StandingService";
import { TagsService } from "@/services/TagService";
import { TeamsService } from "@/services/TeamService";

export const dynamic = "force-dynamic";

export default async function TeamPage({ params }: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const teamsService = new TeamsService();
  const standingsService = new StandingsService();
  const tagsService = new TagsService();

  const teamResponse = await teamsService.getTeamBySlug(slug);
  if (!teamResponse.data) {
    notFound();
  }
  const team = teamResponse.data;

  const [articlesResponse, fixturesResponse, playersResponse, tagsResponse] =
    await Promise.all([
      ArticlesService.getApiArticles(),
      FixturesService.getFixturesByTeamId(team.id),
      PlayersService.getPlayersByTeamId(team.id),
      tagsService.getApiTags(),
    ]);

  const allFixtures = fixturesResponse.data ?? [];
  const fixtures = allFixtures.filter(
    (fixture) => fixture.status !== FixtureStatus.Finished,
  );
  const results = allFixtures.filter(
    (fixture) => fixture.status === FixtureStatus.Finished,
  );

  const matchingTag = (tagsResponse.data ?? []).find(
    (tag) => tag.slug === team.slug,
  );
  const articles = (articlesResponse.data ?? [])
    .filter(
      (article) =>
        article.teamId === team.id ||
        (matchingTag && article.tagIds.includes(matchingTag.id)),
    )
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
      players={playersResponse.data ?? []}
      standingsByCompetition={standingsByCompetition}
    />
  );
}
