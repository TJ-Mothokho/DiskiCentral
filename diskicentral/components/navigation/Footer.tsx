import { Globe, Rss, Play, Mail } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  return (
    <footer
      className={`border-t mt-16 ${darkMode ? "bg-black border-gray-800 text-gray-300" : "bg-black border-gray-800 text-gray-300"}`}>
      <div className="max-w-360 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green rounded flex items-center justify-center">
                <span className="text-black font-bold text-sm font-display">
                  DC
                </span>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Diski<span className="text-green">Central</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4 max-w-xs">
              South Africa&apos;s premier digital football media platform.
              Bringing you the best coverage of the PSL, Bafana Bafana, CAF
              competitions, and South Africans abroad.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter / X"
                className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green hover:text-black transition-colors">
                <span className="text-xs font-bold">𝕏</span>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green hover:text-black transition-colors">
                <Globe size={14} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green hover:text-black transition-colors">
                <Rss size={14} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green hover:text-black transition-colors">
                <Play size={14} />
              </a>
              <a
                href="#"
                aria-label="Newsletter"
                className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-green hover:text-black transition-colors">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Football */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
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
                    className="text-sm text-gray-400 hover:text-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
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
                    className="text-sm text-gray-400 hover:text-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
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
                    className="text-sm text-gray-400 hover:text-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2025 DiskiCentral. All rights reserved. South African Football.
            Every Day.
          </p>
          <div className="flex items-center gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
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
