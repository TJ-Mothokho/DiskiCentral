interface CategoryBadgeProps {
  category: string;
  small?: boolean;
}

const categoryStyles: Record<string, string> = {
  psl: "bg-green-100 text-green-700",
  caf: "bg-blue-100 text-blue-700",
  transfers: "bg-orange-100 text-orange-700",
  opinion: "bg-gray-100 text-gray-600",
  analysis: "bg-cyan-100 text-cyan-700",
  "bafana-bafana": "bg-yellow-100 text-yellow-700",
  "players-abroad": "bg-purple-100 text-purple-700",
  "match-report": "bg-green-100 text-green-700",
  "womens-football": "bg-pink-100 text-pink-700",
  "youth-football": "bg-teal-100 text-teal-700",
};

export default function CategoryBadge({
  category,
  small = false,
}: CategoryBadgeProps) {
  const categoryKey = category.toLowerCase().replaceAll(" ", "-");

  const styles = categoryStyles[categoryKey] ?? "bg-gray-100 text-gray-600";

  return (
    <span
      className={`font-semibold uppercase tracking-wider rounded-full ${
        small ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"
      } ${styles}`}>
      {category}
    </span>
  );
}
