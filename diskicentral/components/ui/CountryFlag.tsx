type CountryFlagProps = {
  country: string;
  flagUrl?: string | null;
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryCodes = new Map<string, string>();

for (let first = 65; first <= 90; first += 1) {
  for (let second = 65; second <= 90; second += 1) {
    const code = String.fromCharCode(first, second);
    const name = regionNames.of(code);
    if (name && name !== code) countryCodes.set(name.toLowerCase(), code);
  }
}

function countryFlagEmoji(country: string): string | null {
  const code =
    countryCodes.get(country.trim().toLowerCase()) ??
    (/^[a-z]{2}$/i.test(country) ? country.toUpperCase() : null);

  if (!code) return null;

  return String.fromCodePoint(
    ...Array.from(code, (character) => 127397 + character.charCodeAt(0)),
  );
}

export function CountryFlag({ country, flagUrl }: CountryFlagProps) {
  if (flagUrl) {
    return (
      <img
        src={flagUrl}
        alt=""
        aria-hidden="true"
        className="inline-block h-3 w-4 shrink-0 object-cover align-middle"
      />
    );
  }

  const flag = countryFlagEmoji(country);
  return flag ? (
    <span aria-hidden="true" className="inline-block shrink-0 text-sm leading-none">
      {flag}
    </span>
  ) : null;
}
