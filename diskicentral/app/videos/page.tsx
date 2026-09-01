import { Play } from "lucide-react";

import { VideoService } from "@/services/VideoService";

export default async function VideosPage() {
  const darkMode = false;
  const videosResponse = await VideoService.getApiVideos();
  const videos = videosResponse.data ?? [];
  const categories = [
    "All",
    ...Array.from(
      new Set(videos.map((video) => video.categoryName).filter(Boolean)),
    ),
  ];
  const selectedCategory = "All";
  const filtered =
    selectedCategory === "All"
      ? videos
      : videos.filter((video) => video.categoryName === selectedCategory);
  const featured = videos[0];

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6">
      <div className="mb-8">
        <h1
          className={`font-display font-bold text-4xl mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Videos
        </h1>
        <p
          className={`text-base ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Match highlights, analysis, interviews and more
        </p>
      </div>

      {featured && (
        <div
          className={`rounded-2xl overflow-hidden mb-8 ${darkMode ? "bg-gray-900" : "bg-gray-900"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 relative aspect-video bg-gray-800 group cursor-pointer">
              <img
                src={featured.thumbnail ?? ""}
                alt={featured.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-[#00C853] group-hover:scale-110 transition-all duration-200 shadow-xl">
                  <Play
                    size={28}
                    className="text-gray-900 ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm font-medium px-2 py-0.5 rounded">
                {featured.publishedAt
                  ? new Date(featured.publishedAt).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                    })
                  : "New"}
              </div>
            </div>
            <div className="lg:col-span-2 p-6 flex flex-col justify-center">
              <span className="bg-[#00C853] text-black text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide mb-3 inline-block w-fit">
                {featured.categoryName ?? "Video"}
              </span>
              <h2 className="font-display font-bold text-2xl text-white mb-3 leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {featured.description ??
                  "Watch the latest football video analysis and highlights."}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>
                  {featured.publishedAt
                    ? new Date(featured.publishedAt).toLocaleDateString(
                        "en-ZA",
                        { day: "numeric", month: "short", year: "numeric" },
                      )
                    : "Today"}
                </span>
                <span>·</span>
                <span>{(featured.views / 1000).toFixed(1)}k views</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCategory === category
                ? "bg-[#0A0A0A] text-white"
                : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((video) => (
          <div
            key={video.id}
            className={`group rounded-xl overflow-hidden border cursor-pointer hover:shadow-lg transition-all ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
            <div className="relative aspect-video overflow-hidden bg-gray-800">
              <img
                src={video.thumbnail ?? ""}
                alt={video.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-[#00C853] group-hover:scale-110 transition-all duration-200 shadow">
                  <Play
                    size={18}
                    className="text-gray-900 ml-0.5"
                    fill="currentColor"
                  />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
                {video.publishedAt
                  ? new Date(video.publishedAt).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                    })
                  : "New"}
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-[#00C853] text-black text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {video.categoryName ?? "Video"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3
                className={`font-semibold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#00C853] transition-colors ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {video.title}
              </h3>
              <p
                className={`text-xs line-clamp-2 mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                {video.description ?? "Watch the latest coverage."}
              </p>
              <div
                className={`flex items-center justify-between text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                <span>
                  {video.publishedAt
                    ? new Date(video.publishedAt).toLocaleDateString("en-ZA", {
                        day: "numeric",
                        month: "short",
                      })
                    : "Today"}
                </span>
                <span>{(video.views / 1000).toFixed(1)}k views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
