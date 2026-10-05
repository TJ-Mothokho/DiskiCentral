"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleForm from "@/app/admin/articles/[slug]/add/AddArticle";
import { ArticlesService } from "@/services/ArticleService";
import type { Article } from "@/types/article";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ slug }) =>
      ArticlesService.getArticleById(slug)
        .then((response) => setArticle(response.data))
        .catch(() => setError("This article could not be loaded.")),
    );
  }, [params]);

  if (error)
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-300">{error}</p>
        <Link
          href="/admin/articles"
          className="text-sm text-[#00C853] hover:underline">
          Back to articles
        </Link>
      </div>
    );
  if (!article)
    return (
      <div className="mx-auto max-w-6xl space-y-5" aria-busy="true">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-800" />
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="h-[32rem] animate-pulse rounded-xl border border-gray-800 bg-[#111]" />
          <div className="h-[32rem] animate-pulse rounded-xl border border-gray-800 bg-[#111]" />
        </div>
      </div>
    );
  return <ArticleForm article={article} />;
}
