"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Search,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

import CategoryBadge from "@/components/CategoryBadge";
import { useTheme } from "@/themes/ThemeContext";
import { Article } from "@/types/article";
import { Video } from "@/types/video";
import ArticleCard from "./ArticleCard";

const ARTICLES_PER_PAGE = 6;

interface ArticlesContentProps {
  articles: Article[];
  videos: Video[];
}

export default function ArticlesContent({
  articles,
  videos,
}: ArticlesContentProps) {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);

  const categories = Array.from(
    new Map(
      articles
        .filter((article) => article.categoryName)
        .map((article) => [article.categoryId, article.categoryName!]),
    ),
  ).map(([id, name]) => ({ id, name }));
  const query = search.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const categoryMatch =
      !selectedCategoryId || article.categoryId === selectedCategoryId;
    const textMatch =
      !query ||
      [article.title, article.excerpt, article.authorName]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(query));
    return categoryMatch && textMatch;
  });
  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const pageArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  );
  const trending = articles.filter((article) => article.trending).slice(0, 5);
  const popularTags = Array.from(
    new Set(articles.flatMap((article) => article.tagIds)),
  ).slice(0, 8);
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId,
  );

  function selectCategory(categoryId: string | null) {
    setSelectedCategoryId(categoryId);
    setPage(1);
  }

  const surface = darkMode
    ? "bg-gray-900 border-gray-800"
    : "bg-white border-gray-100";
  const mutedText = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <header className="mb-8">
        <h1
          className={`font-display font-bold text-4xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Articles
        </h1>
        <p className={`text-base ${mutedText}`}>
          All the latest from South African football
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <section className="flex-1 min-w-0">
          <div className="relative mb-5">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search articles and authors"
              className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg outline-none focus:border-[#00C853] ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-900"}`}
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${!selectedCategoryId ? "bg-[#0A0A0A] text-white" : darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  selectCategory(
                    category.id === selectedCategoryId ? null : category.id,
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${selectedCategoryId === category.id ? "bg-[#00C853] text-black" : darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                {category.name}
              </button>
            ))}
          </div>
          <p className={`text-sm mb-4 ${mutedText}`}>
            {filteredArticles.length} article
            {filteredArticles.length === 1 ? "" : "s"}
            {selectedCategory && ` in ${selectedCategory.name}`}
            {search && ` matching "${search}"`}
          </p>
          {pageArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {pageArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  darkMode={darkMode}
                />
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-16 rounded-lg border ${darkMode ? "border-gray-800 text-gray-400" : "border-gray-100 text-gray-500"}`}>
              <p className="font-semibold">No articles found</p>
              <p className="text-sm mt-1">
                Try a different search term or category.
              </p>
            </div>
          )}
          {totalPages > 1 && (
            <nav
              className="flex items-center justify-center gap-2"
              aria-label="Article pagination">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className={`p-2 rounded-lg disabled:opacity-40 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white border border-gray-200 text-gray-600"}`}>
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    aria-current={number === currentPage ? "page" : undefined}
                    className={`w-9 h-9 rounded-lg text-sm font-semibold ${number === currentPage ? "bg-[#00C853] text-black" : darkMode ? "bg-gray-800 text-gray-300" : "bg-white border border-gray-200 text-gray-600"}`}>
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className={`p-2 rounded-lg disabled:opacity-40 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white border border-gray-200 text-gray-600"}`}>
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </section>

        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <section className={`rounded-lg border p-4 ${surface}`}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={15} className="text-[#00C853]" />
              <h2
                className={`font-display font-bold text-sm uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
                Trending
              </h2>
            </div>
            <div className="space-y-3">
              {trending.map((article, index) => (
                <div key={article.id} className="flex gap-3">
                  <span className="font-display font-bold text-xl text-[#00C853]/30">
                    {index + 1}
                  </span>
                  <div>
                    <Link
                      href={`/article/${article.slug}`}
                      className={`text-xs font-semibold leading-snug hover:text-[#00C853] line-clamp-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                      {article.title}
                    </Link>
                    <div className="mt-1">
                      <CategoryBadge
                        category={article.categoryName ?? "News"}
                        small
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className={`rounded-lg border p-4 ${surface}`}>
            <div className="flex items-center gap-2 mb-4">
              <Play size={14} className="text-[#00C853]" />
              <h2
                className={`font-display font-bold text-sm uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
                Latest Videos
              </h2>
            </div>
            <div className="space-y-3">
              {videos.slice(0, 3).map((video) => (
                <Link
                  key={video.id}
                  href={`/videos/${video.slug}`}
                  className="group flex gap-3">
                  <div className="relative w-20 h-12 shrink-0 overflow-hidden rounded bg-gray-200">
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Play
                      size={12}
                      className="absolute inset-0 m-auto text-white"
                      fill="currentColor"
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold leading-snug line-clamp-2 group-hover:text-[#00C853] ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    {video.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
          {popularTags.length > 0 && (
            <section className={`rounded-lg border p-4 ${surface}`}>
              <div className="flex items-center gap-2 mb-4">
                <Tag size={14} className="text-[#00C853]" />
                <h2
                  className={`font-display font-bold text-sm uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Popular Tags
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium hover:bg-[#00C853] hover:text-black ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                    {tag}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </main>
  );
}
