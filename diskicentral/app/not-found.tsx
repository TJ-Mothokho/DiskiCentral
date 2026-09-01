import Link from "next/link";

export default function NotFoundPage() {
  const darkMode = false;

  return (
    <main className="max-w-[1440px] mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <div className="mb-8 relative">
        <div className="font-display font-bold text-[120px] sm:text-[180px] leading-none text-[#00C853]/10 select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl sm:text-8xl">⚽</span>
        </div>
      </div>

      <h1
        className={`font-display font-bold text-3xl sm:text-4xl mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Out of Bounds
      </h1>
      <p
        className={`text-base max-w-md mb-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Looks like this page has gone off the pitch. The article, player or team
        you’re looking for may have moved or doesn’t exist.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-[#00C853] text-black font-bold text-sm rounded-xl hover:bg-[#00A344] transition-colors">
          Back to Home
        </Link>
        <Link
          href="/articles"
          className={`px-6 py-3 font-semibold text-sm rounded-xl border transition-colors ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
          Latest News
        </Link>
      </div>
    </main>
  );
}
