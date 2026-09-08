"use client";
import { Article } from "@/types/article";
import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { ArticlesService } from "@/services/ArticleService";

const articleService = new ArticlesService();

export function EditArticle({
  article,
  onClose,
  onUpdated,
}: {
  article: Article;
  onClose: () => void;
  onUpdated: (updated: Article) => void;
}) {
  const [name, setName] = useState(article.name);
  const [slug, setSlug] = useState(article.slug);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError("");
    try {
      const response = await articleService.updateArticle(article.id, {
        name,
        slug,
      });
      onUpdated(response.data);
    } catch {
      setFormError("Failed to update article.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>

    </div>
  );
}
