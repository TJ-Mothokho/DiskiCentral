"use client";

import Link from "next/link";
import { Clock, Eye } from "lucide-react";

import { Article } from "@/types/article";
import CategoryBadge from "@/components/CategoryBadge";


interface ArticleCardProps {
  article: Article;
  variant?: "default" | "horizontal" | "compact" | "featured";
  darkMode?: boolean;
}

export default function ArticleCard({
  article,
  variant = "default",
  darkMode = false,
}: ArticleCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  const category = article.categoryName ?? "Uncategorized";

  if (variant === "horizontal") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group flex gap-4 items-start">
        <div className="relative w-24 h-16 sm:w-32 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-gray-200">
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <CategoryBadge category={category} />

            {article.trending && (
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                Trending
              </span>
            )}
          </div>

          <h3
            className={`text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#00C853] transition-colors ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}>
            {article.title}
          </h3>

          <div
            className={`flex items-center gap-2 mt-1 text-xs ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}>
            <span>{formattedDate}</span>

            <span>·</span>

            <Clock size={10} />

            <span>{article.readingTime} min</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className={`group block p-3 rounded-lg border transition-colors hover:border-[#00C853]/30 ${
          darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
        }`}>
        <div className="flex items-start gap-2 mb-2">
          <CategoryBadge category={category} small />

          {article.trending && (
            <span className="text-xs font-semibold text-orange-500">🔥</span>
          )}
        </div>

        <h3
          className={`text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#00C853] transition-colors ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}>
          {article.title}
        </h3>

        <div
          className={`flex items-center gap-2 mt-2 text-xs ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}>
          <span>{article.authorName ?? "Unknown Author"}</span>

          <span>·</span>

          <span>{formattedDate}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className={`group block rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200 ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
      }`}>
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {article.trending && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Trending
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <CategoryBadge category={category} />
        </div>

        <h3
          className={`font-display font-bold text-base leading-tight line-clamp-2 mb-2 group-hover:text-[#00C853] transition-colors ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}>
          {article.title}
        </h3>

        {article.excerpt && (
          <p
            className={`text-sm leading-relaxed line-clamp-2 mb-3 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
            {article.excerpt}
          </p>
        )}

        <div
          className={`flex items-center justify-between text-xs ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}>
          <div className="flex items-center gap-1.5">
            <span className="font-medium">
              {article.authorName ?? "Unknown Author"}
            </span>

            <span>·</span>

            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.readingTime} min
            </span>

            {article.views > 0 && (
              <span className="flex items-center gap-1">
                <Eye size={11} />
                {(article.views / 1000).toFixed(1)}k
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
