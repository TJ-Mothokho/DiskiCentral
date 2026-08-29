import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Article } from "@/types/article";
import ArticleCard from "@/components/ArticleCard";

interface LatestNewsSectionProps {
  articles: Article[];
  darkMode: boolean;
}

export default function LatestNewsSection({
  articles,
  darkMode,
}: LatestNewsSectionProps) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2
          className={`font-display font-bold text-2xl uppercase tracking-wide ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
          Latest News
        </h2>

        <Link
          href="/news"
          className="flex items-center gap-1 text-sm text-[#00C853] font-semibold hover:gap-2 transition-all">
          All News
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} darkMode={darkMode} />
        ))}
      </div>
    </section>
  );
}
