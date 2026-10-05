export function TableSkeletonRows({
  rows = 6,
  columns,
}: {
  rows?: number;
  columns: number;
}) {
  return (
    <>
      {Array.from({ length: rows }, (_, row) => (
        <tr key={row} className="border-t border-gray-800">
          {Array.from({ length: columns }, (_, cell) => (
            <td key={cell} className="px-4 py-3">
              <div
                className={`h-4 animate-pulse rounded bg-gray-800 ${cell === 0 ? "w-40" : "w-20"}`}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function FormSkeleton() {
  return (
    <div className="mx-auto max-w-6xl space-y-5" aria-busy="true">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-800" />
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="h-[28rem] animate-pulse rounded-xl border border-gray-800 bg-[#111]" />
        <div className="h-[28rem] animate-pulse rounded-xl border border-gray-800 bg-[#111]" />
      </div>
    </div>
  );
}
