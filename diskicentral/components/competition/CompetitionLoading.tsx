export default function CompetitionLoading() {
  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6" aria-busy="true">
      <div className="mb-6 flex items-center gap-6 rounded-xl border border-gray-100 p-8 dark:border-gray-800">
        <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-52 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
      <div className="mb-6 h-11 w-96 max-w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="h-48 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="h-28 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </main>
  );
}
