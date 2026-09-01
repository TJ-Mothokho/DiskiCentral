import Link from "next/link";
import { Play } from "lucide-react";

import { Video } from "@/types/video";

interface VideoSectionProps {
  featuredVideo: Video;
  videos: Video[];
  darkMode: boolean;
}

export default function VideoSection({
  featuredVideo,
  videos,
  darkMode,
}: VideoSectionProps) {
  const allVideos = [featuredVideo, ...videos];

  return (
    <section
      className={`border-y py-8 ${darkMode ? "border-gray-800 bg-gray-950" : "border-gray-100 bg-gray-50"}`}>
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <Play size={18} className="text-[#00C853]" />
            <h2
              className={`font-display font-bold text-2xl uppercase tracking-wide ${darkMode ? "text-white" : "text-gray-900"}`}>
              Videos
            </h2>
          </div>
          <Link href="/videos" className="text-sm text-[#00C853] font-semibold">
            All Videos
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allVideos.map((video, index) => (
            <Link
              key={video.id}
              href={`/videos/${video.slug}`}
              className={`group block rounded-lg overflow-hidden border ${index === 0 ? "sm:col-span-2 lg:col-span-2" : ""} ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
              <div
                className={`relative overflow-hidden bg-gray-800 ${index === 0 ? "aspect-video" : "aspect-[16/10]"}`}>
                {video.thumbnail && (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <span className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-[#00C853] text-black flex items-center justify-center">
                  <Play size={18} fill="currentColor" />
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#00C853] mb-2">
                  {video.categoryName ?? "Video"}
                </p>
                <h3
                  className={`font-display font-bold leading-snug line-clamp-2 group-hover:text-[#00C853] transition-colors ${index === 0 ? "text-lg" : "text-base"} ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
