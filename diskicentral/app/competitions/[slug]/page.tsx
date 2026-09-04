import { notFound } from "next/navigation";

import CompetitionContent from "@/components/competition/CompetitionContent";
import { ArticlesService } from "@/services/ArticleService";
import { CompetitionsService } from "@/services/CompetitionService";
import { FixturesService } from "@/services/FixtureService";
import { ResultsService } from "@/services/ResultService";
import { StandingsService } from "@/services/StandingService";

export const dynamic = "force-dynamic";

export default async function CompetitionPage({
  params,
}: PageProps<"/competitions/[slug]">) {
  const { slug } = await params;
  const competitionsService = new CompetitionsService();
  const standingsService = new StandingsService();
  const competitionResponse =
    await competitionsService.getCompetitionBySlug(slug);

  if (!competitionResponse.data) {
    notFound();
  }

  const competition = competitionResponse.data;
  const [
    articlesResponse,
    fixturesResponse,
    resultsResponse,
    standingsResponse,
  ] = await Promise.all([
    ArticlesService.getApiArticles(),
    FixturesService.getFixturesByCompetitionId(competition.id),
    ResultsService.getApiResults(),
    standingsService.getStandingsByCompetitionId(competition.id),
  ]);

  const fixtures = fixturesResponse.data ?? [];
  const fixtureIds = new Set(fixtures.map((fixture) => fixture.id));
  const results = (resultsResponse.data ?? []).filter((result) =>
    fixtureIds.has(result.fixtureId),
  );
  const fixtureById = new Map(fixtures.map((fixture) => [fixture.id, fixture]));
  const searchTerms = [competition.name, competition.shortName]
    .filter(Boolean)
    .map((term) => term!.toLowerCase());
  const articles = (articlesResponse.data ?? [])
    .filter((article) =>
      searchTerms.some((term) =>
        [article.title, article.categoryName]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term)),
      ),
    )
    .slice(0, 6);

  return (
    <CompetitionContent
      competition={competition}
      articles={articles}
      fixtures={fixtures}
      results={results}
      fixtureById={fixtureById}
      standings={standingsResponse.data ?? []}
    />
  );
}
