import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ArticleCard from "@/components/article/ArticleCard";
import { Article } from "@/types/article";

interface CompetitionSectionProps {
  title: string;
  subtitle: string;
  articles: Article[];
  href: string;
  linkText: string;
  darkMode: boolean;
}

export default function CompetitionSection({
  title,
  subtitle,
  articles,
  href,
  linkText,
  darkMode,
}: CompetitionSectionProps) {
  const accentColor = title === "CAF" ? "bg-blue-500" : "bg-[#00C853]";
  const linkColor = title === "CAF" ? "text-blue-500" : "text-[#00C853]";

  return (
    <section
      className={`border-y py-8 ${title === "CAF" ? (darkMode ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-gray-50") : "border-transparent"}`}>
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-1 h-6 rounded-full shrink-0 ${accentColor}`} />
            <h2
              className={`font-display font-bold text-2xl uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
              {title}
            </h2>
            <span
              className={`text-sm font-medium truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {subtitle}
            </span>
          </div>
          <Link
            href={href}
            className={`flex items-center gap-1 shrink-0 text-sm font-semibold hover:gap-2 transition-all ${linkColor}`}>
            {linkText}
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
