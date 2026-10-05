export default function Loading() {
  return (
    <main className="max-w-[1440px] mx-auto px-4 py-6" aria-busy="true">
      <div className="mb-8 space-y-2">
        <div className="h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <section className="flex-1 min-w-0">
          <div className="mb-5 h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="mb-6 flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="h-7 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="aspect-[16/9] animate-pulse bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          ))}
        </aside>
      </div>
    </main>
  );
}
