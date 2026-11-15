export function statNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") { const number = Number(value.replace("%", "")); return Number.isFinite(number) ? number : null; }
  return null;
}

export function statText(value: unknown, fallback = "—") {
  if (typeof value === "string" || typeof value === "number") return String(value);
  return fallback;
}
