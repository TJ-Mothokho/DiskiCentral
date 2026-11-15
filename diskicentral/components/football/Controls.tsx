import Link from "next/link";

export function Tabs({
  items,
  active,
}: {
  items: Array<{ label: string; href: string }>;
  active?: string;
}) {
  return (
    <nav className="tab-row" aria-label="Section navigation">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={`tab ${active === item.label ? "tab--active" : ""}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function FilterLinks({
  items,
}: {
  items: Array<{ label: string; href: string; active?: boolean }>;
}) {
  return (
    <div className="filter-row" aria-label="Filters">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={`filter-chip ${item.active ? "filter-chip--active" : ""}`}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
