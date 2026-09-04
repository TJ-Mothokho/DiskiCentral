"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { ArticlesService } from "@/services/ArticleService";
import type { Article } from "@/types/article";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    void ArticlesService.getApiArticles()
      .then((response) => setArticles(response.data ?? []))
      .catch(() => setArticles([]));
  }, []);

  const filtered = articles.filter((article) =>
    [article.title, article.authorName, article.categoryName].some((value) =>
      value?.toLowerCase().includes(search.toLowerCase()),
    ),
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-display font-bold text-white">
            Articles
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {articles.length} total articles
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={15} /> New Article
        </button>
      </div>
      <div className="relative max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles..."
          className="w-full pl-9 pr-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]"
        />
      </div>
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              {["Article", "Category", "Author", "Views"].map((heading) => (
                <th
                  key={heading}
                  className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((article) => (
              <tr
                key={article.id}
                className="border-t border-gray-800 hover:bg-gray-900/30">
                <td className="px-4 py-3 text-gray-200 font-medium min-w-64">
                  {article.title}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.categoryName ?? "Uncategorized"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.authorName ?? "Unknown"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.views.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
}
