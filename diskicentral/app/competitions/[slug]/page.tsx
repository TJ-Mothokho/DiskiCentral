import { notFound } from "next/navigation";

import CompetitionContent from "@/components/competition/CompetitionContent";
import { ArticlesService } from "@/services/ArticleService";
import { CompetitionsService } from "@/services/CompetitionService";
import { FixturesService } from "@/services/FixtureService";
import { StandingsService } from "@/services/StandingService";
import { TagsService } from "@/services/TagService";

export const dynamic = "force-dynamic";

export default async function CompetitionPage({
  params,
}: PageProps<"/competitions/[slug]">) {
  const { slug } = await params;
  const competitionsService = new CompetitionsService();
  const standingsService = new StandingsService();
  const tagsService = new TagsService();
  const competitionResponse =
    await competitionsService.getCompetitionBySlug(slug);

  if (!competitionResponse.data) {
    notFound();
  }

  const competition = competitionResponse.data;
  const [articlesResponse, fixturesResponse, standingsResponse, tagsResponse] =
    await Promise.all([
      ArticlesService.getApiArticles(),
      FixturesService.getFixturesByCompetitionId(competition.id),
      standingsService.getStandingsByCompetitionId(competition.id),
      tagsService.getApiTags(),
    ]);

  const fixtures = fixturesResponse.data ?? [];
  const matchingTag = (tagsResponse.data ?? []).find(
    (tag) => tag.slug === competition.slug,
  );
  const articles = (articlesResponse.data ?? [])
    .filter((article) => matchingTag && article.tagIds.includes(matchingTag.id))
    .slice(0, 6);

  return (
    <CompetitionContent
      competition={competition}
      articles={articles}
      fixtures={fixtures}
      standings={standingsResponse.data ?? []}
    />
  );
}
