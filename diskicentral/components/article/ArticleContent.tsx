"use client";

import Link from "next/link";
import { Calendar, Clock, Eye, Share2 } from "lucide-react";
import { FormEvent, useState } from "react";

import CategoryBadge from "@/components/CategoryBadge";
import { useTheme } from "@/themes/ThemeContext";
import { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

interface ArticleContentProps {
  article: Article;
  articles: Article[];
}

export default function ArticleContent({
  article,
  articles,
}: ArticleContentProps) {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const relatedArticles = articles
    .filter((candidate) => article.relatedArticleIds.includes(candidate.id))
    .slice(0, 3);
  const moreFromCategory = articles
    .filter(
      (candidate) =>
        candidate.categoryId === article.categoryId &&
        candidate.id !== article.id,
    )
    .slice(0, 3);
  const latestArticles = articles
    .filter((candidate) => candidate.id !== article.id)
    .slice(0, 5);
  const publishedAt = article.publishedAt
    ? new Date(article.publishedAt)
    : null;

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  async function shareArticle() {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        url: window.location.href,
      });
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="flex-1 min-w-0 max-w-3xl">
          <nav
            className={`flex items-center gap-2 text-xs mb-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#00C853] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/articles"
              className="hover:text-[#00C853] transition-colors">
              News
            </Link>
            <span>/</span>
            <span className="truncate">{article.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <CategoryBadge category={article.categoryName ?? "News"} />
            {article.trending && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                Trending
              </span>
            )}
          </div>

          <h1
            className={`font-display font-bold text-3xl sm:text-4xl leading-tight mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {article.title}
          </h1>
          {article.subtitle && (
            <p
              className={`text-lg leading-relaxed mb-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {article.subtitle}
            </p>
          )}

          <div
            className={`flex flex-wrap items-center gap-4 pb-5 mb-5 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
            <div
              className={`w-9 h-9 rounded-full bg-[#00C853] text-black flex items-center justify-center font-display font-bold ${darkMode ? "" : ""}`}>
              {(article.authorName ?? "D").charAt(0).toUpperCase()}
            </div>
            <span
              className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              {article.authorName ?? "DiskiCentral"}
            </span>
            <div
              className={`flex flex-wrap items-center gap-4 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {publishedAt.toLocaleDateString("en-ZA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {article.readingTime} min read
              </span>
              {article.views > 0 && (
                <span className="flex items-center gap-1">
                  <Eye size={12} />
                  {article.views.toLocaleString()} views
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={shareArticle}
              title="Share article"
              aria-label="Share article"
              className={`ml-auto p-2 rounded-full transition-colors ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              <Share2 size={16} />
            </button>
          </div>

          {article.heroImage && (
            <div className="rounded-lg overflow-hidden mb-6 bg-gray-200 aspect-video">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className={`rounded-lg border-2 border-dashed flex items-center justify-center h-16 mb-6 text-xs ${darkMode ? "border-gray-700 text-gray-600" : "border-gray-200 text-gray-400"}`}>
            Advertisement
          </div>

          <div
            className={`prose prose-base max-w-none mb-8 leading-relaxed ${darkMode ? "prose-invert text-gray-200" : "text-gray-800"}`}
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {article.tagIds.length > 0 && (
            <div
              className={`flex flex-wrap items-center gap-2 pb-6 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                Tags:
              </span>
              {article.tagIds.map((tagId) => (
                <Link
                  key={tagId}
                  href={`/search?q=${encodeURIComponent(tagId)}`}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors hover:bg-[#00C853] hover:text-black ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                  {tagId}
                </Link>
              ))}
            </div>
          )}

          <div
            className={`rounded-lg border p-5 my-6 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-100"}`}>
            <h2
              className={`font-display font-bold text-base ${darkMode ? "text-white" : "text-gray-900"}`}>
              {article.authorName ?? "DiskiCentral"}
            </h2>
            <p
              className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Football journalist at DiskiCentral
            </p>
          </div>

          <section className="bg-[#0A0A0A] rounded-lg p-6 my-6 text-center">
            <h2 className="font-display font-bold text-xl text-white mb-1">
              Enjoy this article?
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for daily South African football coverage.
            </p>
            {subscribed ? (
              <span className="text-[#00C853] text-sm font-semibold">
                Subscribed.
              </span>
            ) : (
              <form
                onSubmit={subscribe}
                className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853] placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
                  Subscribe
                </button>
              </form>
            )}
          </section>

          {relatedArticles.length > 0 && (
            <section className="my-8">
              <h2
                className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <ArticleCard
                    key={related.id}
                    article={related}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </section>
          )}
          {moreFromCategory.length > 0 && (
            <section className="my-8">
              <h2
                className={`font-display font-bold text-xl mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                More from {article.categoryName ?? "this category"}
              </h2>
              <div className="space-y-3">
                {moreFromCategory.map((categoryArticle) => (
                  <ArticleCard
                    key={categoryArticle.id}
                    article={categoryArticle}
                    variant="horizontal"
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="w-full lg:w-72 shrink-0 space-y-5">
          <div
            className={`rounded-lg border-2 border-dashed flex items-center justify-center h-48 text-xs ${darkMode ? "border-gray-700 text-gray-600" : "border-gray-200 text-gray-400"}`}>
            Advertisement 300 x 250
          </div>
          <section
            className={`rounded-lg border p-4 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <h2
              className={`font-display font-bold text-sm uppercase tracking-wide mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Latest News
            </h2>
            <div className="space-y-4">
              {latestArticles.map((latest) => (
                <ArticleCard
                  key={latest.id}
                  article={latest}
                  variant="horizontal"
                  darkMode={darkMode}
                />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
