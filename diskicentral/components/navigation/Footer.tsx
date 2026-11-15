import Link from "next/link";

export default function Footer({ darkMode }: { darkMode: boolean }) {
  return (
    <footer className={`site-footer ${darkMode ? "bg-primary text-surface" : ""}`}>
      <div className="page-frame flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="wordmark">DISKI <span>CENTRAL</span></Link>
          <p className="mt-3 max-w-sm text-sm text-secondary">Football lives here. Follow the match, understand the numbers, and stay close to South African football.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-secondary">
          <Link href="/">Match centre</Link>
          <Link href="/fixtures">Fixtures</Link>
          <Link href="/leagues">Leagues</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/login">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
