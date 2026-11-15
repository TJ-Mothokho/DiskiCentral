import { ArticlesService } from "@/services/ArticleService";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/football/ArticleCard";
import { AdSlot, EmptyState } from "@/components/football/Primitives";
import Link from "next/link";
import type { Article } from "@/types/article";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; let article;
  try { const result = await ArticlesService.getArticleBySlug(slug); article = result.success ? result.data : undefined; } catch { article = undefined; }
  if (!article) notFound();
  let related: Article[] = [];
  try { const result = await ArticlesService.getApiArticles(); related = result.success ? result.data.filter((item) => item.id !== article.id && (item.categoryId === article.categoryId || item.teamId === article.teamId)).slice(0, 3) : []; } catch { related = []; }
  return <main className="page-frame py-8 sm:py-12"><Link href="/articles" className="text-sm font-semibold text-primary">← All stories</Link><article className="mt-7"><p className="eyebrow">{article.categoryName ?? "Football"} · {article.readingTime} min read</p><h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-0.05em] text-primary sm:text-6xl">{article.title}</h1>{article.subtitle ? <p className="mt-4 max-w-2xl text-lg text-secondary">{article.subtitle}</p> : null}<p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-ZA", { dateStyle: "long" }) : "DiskiCentral Desk"}</p><div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]"><div><div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }} /><div className="my-10"><AdSlot label="Sponsored" /></div></div><aside className="space-y-5"><AdSlot /></aside></div></article>{related.length ? <section className="mt-14"><p className="eyebrow">Related coverage</p><h2 className="mt-2 text-2xl font-bold text-primary">Keep reading</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{related.map((item) => <ArticleCard key={item.id} article={item} />)}</div></section> : <EmptyState title="No related stories yet" message="More coverage will appear here as the desk publishes it." />}</main>;
}
