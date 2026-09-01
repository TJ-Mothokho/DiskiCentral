import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { ArticlesService } from "@/services/ArticleService";
import type { Article } from "@/types/article";

export default async function OpinionPage() {
  const darkMode = false;
  const articlesResponse = await ArticlesService.getApiArticles();
  const editorial = (articlesResponse.data ?? []).filter(
    (article) =>
      article.categoryName && /opinion|analysis/i.test(article.categoryName),
  );

  const featured = editorial[0];
  const rest = editorial.slice(1);

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="mb-8">
        <h1
          className={`font-display font-bold text-4xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Opinion & Analysis
        </h1>
        <p
          className={`text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Sharp takes, long-form analysis, and editorial voices on South African
          football
        </p>
      </div>

      {featured && (
        <Link href={`/article/${featured.slug}`} className="group block mb-10">
          <div
            className={`rounded-2xl border overflow-hidden flex flex-col lg:flex-row ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="lg:w-1/2 aspect-[16/9] lg:aspect-auto overflow-hidden bg-gray-200">
              <img
                src={featured.heroImage ?? featured.thumbnail ?? ""}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  {featured.categoryName ?? "Opinion"}
                </span>
                <span className="text-xs font-semibold text-[#00C853] uppercase tracking-wide">
                  Editor’s Pick
                </span>
              </div>
              <h2
                className={`font-display font-bold text-2xl sm:text-3xl leading-tight mb-3 group-hover:text-[#00C853] transition-colors ${darkMode ? "text-white" : "text-gray-900"}`}>
                {featured.title}
              </h2>
              <p
                className={`text-base leading-relaxed mb-5 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {featured.excerpt ??
                  "Read the latest opinion and analysis from our team."}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featured.heroImage ?? "/images/default-author.png"}
                    alt={featured.authorName ?? "Author"}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div
                      className={`text-sm font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                      {featured.authorName ?? "DiskiCentral"}
                    </div>
                    <div
                      className={`text-xs flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      <Clock size={11} /> {featured.readingTime} min read
                    </div>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[#00C853] text-sm font-semibold group-hover:gap-3 transition-all">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {rest.map((article: Article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className={`group rounded-xl border overflow-hidden hover:shadow-md transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="aspect-video overflow-hidden bg-gray-200">
              <img
                src={article.thumbnail ?? article.heroImage ?? ""}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {article.categoryName ?? "Opinion"}
                </span>
              </div>
              <h3
                className={`font-display font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-[#00C853] transition-colors ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {article.title}
              </h3>
              <p
                className={`text-sm line-clamp-2 mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {article.excerpt ?? "Read more from our analysis desk."}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={article.heroImage ?? "/images/default-author.png"}
                    alt={article.authorName ?? "Author"}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span
                    className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {article.authorName ?? "DiskiCentral"}
                  </span>
                </div>
                <span
                  className={`text-xs flex items-center gap-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <Clock size={11} /> {article.readingTime} min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
