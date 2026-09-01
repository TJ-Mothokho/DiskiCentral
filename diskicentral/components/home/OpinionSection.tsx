import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Article } from "@/types/article";

interface OpinionSectionProps {
  articles: Article[];
  darkMode: boolean;
}

export default function OpinionSection({
  articles,
  darkMode,
}: OpinionSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gray-600 rounded-full" />
          <h2
            className={`font-display font-bold text-2xl uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
            Opinion & Analysis
          </h2>
        </div>
        <Link
          href="/opinion"
          className="flex items-center gap-1 text-sm text-gray-500 font-semibold">
          More Opinion
          <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className={`group flex gap-4 p-5 rounded-lg border hover:shadow-md transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="w-24 h-20 rounded-lg overflow-hidden bg-gray-200 shrink-0">
              {article.thumbnail && (
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Opinion
              </span>
              <h3
                className={`font-display font-bold text-base leading-snug line-clamp-2 mt-2 group-hover:text-[#00C853] transition-colors ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {article.title}
              </h3>
              <p
                className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {article.authorName ?? "DiskiCentral"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
