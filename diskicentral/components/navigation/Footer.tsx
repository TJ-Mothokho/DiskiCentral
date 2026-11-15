import { Globe, Rss, Play, Mail } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  return (
    <footer
      className={`mt-16 border-t ${
        darkMode
          ? "border-secondary/30 bg-primary text-surface"
          : "border-secondary/20 bg-surface text-ink"
      }`}>
      <div className="max-w-360 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  DC
                </span>
              </div>
              <span className={`font-bold text-xl tracking-tight ${darkMode ? "text-surface" : "text-primary"}`}>
                Diski<span className="text-accent">Central</span>
              </span>
            </Link>
            <p className={`text-sm leading-relaxed mb-4 max-w-xs ${darkMode ? "text-surface/70" : "text-secondary"}`}>
              South Africa&apos;s premier digital football media platform.
              Bringing you the best coverage of the PSL, Bafana Bafana, CAF
              competitions, and South Africans abroad.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter / X"
                className={`w-8 h-8 rounded flex items-center justify-center hover:bg-accent hover:text-primary transition-colors ${darkMode ? "bg-surface/10 text-surface" : "bg-canvas text-primary"}`}>
                <span className="text-xs font-bold">X</span>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className={`w-8 h-8 rounded flex items-center justify-center hover:bg-accent hover:text-primary transition-colors ${darkMode ? "bg-surface/10 text-surface" : "bg-canvas text-primary"}`}>
                <Globe size={14} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className={`w-8 h-8 rounded flex items-center justify-center hover:bg-accent hover:text-primary transition-colors ${darkMode ? "bg-surface/10 text-surface" : "bg-canvas text-primary"}`}>
                <Rss size={14} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className={`w-8 h-8 rounded flex items-center justify-center hover:bg-accent hover:text-primary transition-colors ${darkMode ? "bg-surface/10 text-surface" : "bg-canvas text-primary"}`}>
                <Play size={14} />
              </a>
              <a
                href="#"
                aria-label="Newsletter"
                className={`w-8 h-8 rounded flex items-center justify-center hover:bg-accent hover:text-primary transition-colors ${darkMode ? "bg-surface/10 text-surface" : "bg-canvas text-primary"}`}>
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Football */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${darkMode ? "text-surface" : "text-primary"}`}>
              Football
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "PSL", href: "/competitions/psl" },
                {
                  label: "CAF Champions League",
                  href: "/competitions/caf-champions-league",
                },
                {
                  label: "CAF Confederation Cup",
                  href: "/competitions/caf-confederation-cup",
                },
                {
                  label: "Bafana Bafana",
                  href: "/news?category=bafana-bafana",
                },
                { label: "Players Abroad", href: "/players-abroad" },
                { label: "Transfers", href: "/transfers" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${darkMode ? "text-surface/70 hover:text-accent" : "text-secondary hover:text-primary"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${darkMode ? "text-surface" : "text-primary"}`}>
              Content
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "News", href: "/news" },
                { label: "Match Reports", href: "/news?category=match-report" },
                { label: "Analysis", href: "/news?category=analysis" },
                { label: "Opinion", href: "/opinion" },
                { label: "Videos", href: "/videos" },
                { label: "Search", href: "/search" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${darkMode ? "text-surface/70 hover:text-accent" : "text-secondary hover:text-primary"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${darkMode ? "text-surface" : "text-primary"}`}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Editorial Principles", href: "/about#editorial" },
                { label: "Meet the Team", href: "/about#team" },
                { label: "Advertise", href: "/about#advertise" },
                { label: "Contact", href: "/contact" },
                { label: "Admin Panel", href: "/admin" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${darkMode ? "text-surface/70 hover:text-accent" : "text-secondary hover:text-primary"}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${darkMode ? "border-surface/10" : "border-secondary/20"}`}>
          <p className={`text-xs ${darkMode ? "text-surface/60" : "text-secondary"}`}>
            © 2025 DiskiCentral. All rights reserved. South African Football.
            Every Day.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className={`text-xs transition-colors ${darkMode ? "text-surface/60 hover:text-surface" : "text-secondary hover:text-primary"}`}>
                  {item}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
