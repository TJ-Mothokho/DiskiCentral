"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { ArticlesService } from "@/services/ArticleService";
import type { Article } from "@/types/article";

const STATUS_LABELS: Record<number, string> = {
  0: "Draft",
  1: "Published",
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [titleSortAsc, setTitleSortAsc] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void ArticlesService.getApiArticles()
      .then((response) => setArticles(response.data ?? []))
      .catch(() => setArticles([]));
  }, []);

  const authors = useMemo(
    () =>
      Array.from(
        new Set(
          articles
            .map((article) => article.personName)
            .filter((name): name is string => Boolean(name)),
        ),
      ).sort(),
    [articles],
  );

  const filtered = articles
    .filter((article) =>
      [article.title, article.personName, article.categoryName].some((value) =>
        value?.toLowerCase().includes(search.toLowerCase()),
      ),
    )
    .filter((article) =>
      statusFilter === "all" ? true : article.status === Number(statusFilter),
    )
    .filter((article) =>
      authorFilter === "all" ? true : article.personName === authorFilter,
    )
    .filter((article) =>
      dateFilter ? article.publishedAt?.slice(0, 10) === dateFilter : true,
    )
    .sort((a, b) =>
      titleSortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title),
    );

  async function handleDelete(article: Article) {
    if (!confirm(`Delete "${article.title}"? This cannot be undone.`)) return;
    setDeletingId(article.id);
    setError("");
    try {
      await ArticlesService.deleteArticle(article.id);
      setArticles((prev) => prev.filter((entry) => entry.id !== article.id));
    } catch {
      setError("Failed to delete article.");
    } finally {
      setDeletingId(null);
    }
  }

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
        <Link
          href="/admin/articles/add"
          className="flex items-center gap-1.5 px-4 py-2 bg-[#00C853] text-black font-bold text-sm rounded-lg hover:bg-[#00A344]">
          <Plus size={15} /> New Article
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1 min-w-50">
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
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="px-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]">
          <option value="all">All statuses</option>
          <option value="0">Draft</option>
          <option value="1">Published</option>
        </select>
        <select
          value={authorFilter}
          onChange={(event) => setAuthorFilter(event.target.value)}
          className="px-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]">
          <option value="all">All authors</option>
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(event) => setDateFilter(event.target.value)}
          className="px-3 py-2 bg-[#111] border border-gray-700 text-white rounded-lg text-sm outline-none focus:border-[#00C853]"
        />
      </div>
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <button
                  type="button"
                  onClick={() => setTitleSortAsc((current) => !current)}
                  className="flex items-center gap-1 hover:text-white">
                  Article
                  {titleSortAsc ? (
                    <ArrowDownAZ size={13} />
                  ) : (
                    <ArrowUpAZ size={13} />
                  )}
                </button>
              </th>
              {[
                "Category",
                "Author",
                "Status",
                "Published",
                "Views",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${heading === "Actions" ? "text-right" : "text-left"}`}>
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
                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="hover:text-[#00C853]">
                    {article.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.categoryName ?? "Uncategorized"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.personName ?? "Unknown"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {STATUS_LABELS[article.status] ?? "Draft"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString("en-ZA")
                    : "—"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {article.views.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      aria-label={`Edit ${article.title}`}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
                      <Pencil size={14} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Delete ${article.title}`}
                      disabled={deletingId === article.id}
                      onClick={() => void handleDelete(article)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 disabled:opacity-50">
                      <Trash2 size={14} />
                    </button>
                  </div>
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
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
