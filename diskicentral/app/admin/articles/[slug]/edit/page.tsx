"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleForm from "@/app/admin/articles/[slug]/add/AddArticle";
import { ArticlesService } from "@/services/ArticleService";
import type { Article } from "@/types/article";

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    void params.then(({ slug }) => ArticlesService.getArticleById(slug).then((response) => setArticle(response.data)).catch(() => setError("This article could not be loaded.")));
  }, [params]);

  if (error) return <div className="space-y-3"><p className="text-sm text-red-300">{error}</p><Link href="/admin/articles" className="text-sm text-[#00C853] hover:underline">Back to articles</Link></div>;
  if (!article) return <p className="text-sm text-gray-500">Loading article...</p>;
  return <ArticleForm article={article} />;
}
