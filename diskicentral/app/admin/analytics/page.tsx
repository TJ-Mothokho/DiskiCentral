"use client";

import { useEffect, useState } from "react";
import { ArticlesService } from "@/services/ArticleService";
import { VideoService } from "@/services/VideoService";

export default function AdminAnalyticsPage() {
  const [articleCount, setArticleCount] = useState<number | null>(null);
  const [videoCount, setVideoCount] = useState<number | null>(null);
  const [totalViews, setTotalViews] = useState<number | null>(null);

  useEffect(() => {
    void Promise.all([
      ArticlesService.getApiArticles(),
      VideoService.getApiVideos(),
    ])
      .then(([articles, videos]) => {
        setArticleCount(articles.data?.length ?? 0);
        setVideoCount(videos.data?.length ?? 0);
        setTotalViews(
          (articles.data ?? []).reduce(
            (total, article) => total + article.views,
            0,
          ),
        );
      })
      .catch(() => {});
  }, []);

  const metrics = [
    ["Articles", articleCount],
    ["Videos", videoCount],
    ["Article views", totalViews],
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-display font-bold text-white">
          Content Analytics
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Metrics derived from live service data
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map(([label, value]) => (
          <div
            key={String(label)}
            className="bg-[#111] border border-gray-800 rounded-xl p-4">
            <div className="text-2xl font-display font-bold text-white">
              {value === null ? "-" : Number(value).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <section className="bg-[#111] border border-gray-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-3">Data source</h2>
        <p className="text-sm text-gray-400">
          Traffic and engagement analytics require a dedicated analytics
          endpoint. This view intentionally displays only values available from
          the existing article and video services.
        </p>
      </section>
    </div>
  );
}
