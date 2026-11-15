"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  ["Match centre", "/"],
  ["Leagues", "/leagues"],
  ["Teams", "/teams"],
  ["Articles", "/articles"],
] as const;

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <header className="site-header">
      <nav className="site-nav page-frame" aria-label="Main navigation">
        <Link href="/" className="wordmark" aria-label="DiskiCentral home">
          DISKI <span>CENTRAL</span>
        </Link>
        <div className="nav-links">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
          ))}
        </div>
        <form className="relative ml-auto hidden md:block" onSubmit={(event) => { event.preventDefault(); router.push(`/articles?q=${encodeURIComponent(query)}`); }}>
          <Search size={14} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" />
          <input className="nav-search pl-6" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search articles" />
        </form>
        <div className="nav-actions hidden items-center gap-2 md:flex">
          <Link href="/login" className="ui-button ui-button--secondary">Log in</Link>
          <Link href="/register" className="ui-button ui-button--primary">Sign up</Link>
        </div>
        <button type="button" className="mobile-menu" aria-label="Open navigation menu" title="Navigation menu"><Menu size={20} /></button>
      </nav>
    </header>
  );
}
