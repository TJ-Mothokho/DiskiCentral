export function MatchEventAvatar({
  src,
  name,
  team = false,
}: {
  src?: string;
  name: string | null;
  team?: boolean;
}) {
  if (src) {
    const imageStyle = team ? "object-contain p-1" : "object-cover";
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`h-10 w-10 shrink-0 rounded-full bg-surface ${imageStyle}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
    >
      {name?.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
