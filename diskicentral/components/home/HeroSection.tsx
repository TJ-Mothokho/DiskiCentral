import Link from "next/link";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

import { Article } from "@/types/article";
import CategoryBadge from "@/components/CategoryBadge";

interface HeroSectionProps {
  article: Article;
  trending: Article[];
  darkMode: boolean;
}

export default function HeroSection({
  article,
  trending,
  darkMode,
}: HeroSectionProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-ZA", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured story */}
        <Link
          href={`/article/${article.slug}`}
          className="group lg:col-span-2 relative rounded-2xl overflow-hidden block aspect-[16/10] bg-gray-900">
          {article.heroImage && (
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={article.categoryName ?? "News"} />

              <span className="text-white/70 text-xs flex items-center gap-1">
                <Clock size={11} />
                {article.readingTime} min read
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-3 group-hover:text-[#00C853] transition-colors">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2 max-w-2xl">
                {article.excerpt}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="font-medium text-white">
                  {article.authorName ?? "DiskiCentral"}
                </span>

                <span>·</span>

                <span>{formattedDate}</span>
              </div>

              <span className="flex items-center gap-1.5 text-[#00C853] text-sm font-semibold">
                Read More
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </Link>

        {/* Trending */}
        <div
          className={`rounded-2xl border p-5 ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100"
          }`}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#00C853]" />

            <h2
              className={`font-display font-bold text-lg uppercase tracking-wide ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
              Trending
            </h2>
          </div>

          <div className="space-y-4">
            {trending.map((article, index) => (
              <div key={article.id} className="flex gap-3">
                <span className="font-display font-bold text-3xl leading-none text-[#00C853]/30 shrink-0 w-8">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <Link
                    href={`/article/${article.slug}`}
                    className={`text-sm font-semibold leading-snug hover:text-[#00C853] transition-colors line-clamp-2 ${
                      darkMode ? "text-gray-200" : "text-gray-900"
                    }`}>
                    {article.title}
                  </Link>

                  <div
                    className={`flex items-center gap-1.5 mt-1 text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}>
                    <CategoryBadge
                      category={article.categoryName ?? "News"}
                      small
                    />

                    <span>
                      {article.publishedAt &&
                        new Date(article.publishedAt).toLocaleDateString(
                          "en-ZA",
                          {
                            day: "numeric",
                            month: "short",
                          },
                        )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
