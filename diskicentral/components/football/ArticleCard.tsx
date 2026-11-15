import Link from "next/link";
import type { Article } from "@/types/article";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link href={`/articles/${article.slug}`} className={`article-card ${featured ? "article-card--featured" : ""}`}>
      <div className="article-card__image" aria-hidden="true">
        {article.thumbnail || article.heroImage ? (
          <img src={article.thumbnail ?? article.heroImage ?? ""} alt="" loading="lazy" />
        ) : (
          <span>{article.categoryName ?? "DiskiCentral"}</span>
        )}
      </div>
      <div className="p-5">
        <p className="eyebrow">{article.categoryName ?? "Football"} · {article.readingTime} min read</p>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-primary">{article.title}</h3>
        {article.excerpt ? <p className="mt-2 line-clamp-2 text-sm text-secondary">{article.excerpt}</p> : null}
      </div>
    </Link>
  );
}
