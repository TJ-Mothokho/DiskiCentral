export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6" aria-busy="true">
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        <div className="flex-1 min-w-0 lg:max-w-3xl space-y-4">
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="flex items-center gap-3 pb-5">
            <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="aspect-video animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-800"
              style={{ width: `${95 - (i % 3) * 12}%` }}
            />
          ))}
        </div>
        <aside className="w-full lg:w-80 shrink-0 space-y-5">
          <div className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="h-72 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        </aside>
      </div>
    </main>
  );
}
