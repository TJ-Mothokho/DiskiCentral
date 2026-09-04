"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  {
    label: "PSL",
    href: "/competitions/psl",
    submenu: [
      { label: "Latest PSL News", href: "/competitions/psl" },
      { label: "Standings", href: "/competitions/psl#standings" },
      { label: "Fixtures", href: "/competitions/psl#fixtures" },
    ],
  },
  {
    label: "CAF",
    href: "/competitions/caf-champions-league",
    submenu: [
      { label: "Champions League", href: "/competitions/caf-champions-league" },
      {
        label: "Confederation Cup",
        href: "/competitions/caf-confederation-cup",
      },
    ],
  },
  { label: "Players Abroad", href: "/players-abroad" },
  { label: "Transfers", href: "/transfers" },
  { label: "Videos", href: "/videos" },
  { label: "Opinion", href: "/opinion" },
];

interface NavbarProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function Navbar({
  darkMode = false,
  toggleDarkMode,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white shadow-md border-b border-gray-100"
          : "bg-white border-b border-gray-200"
      } ${darkMode ? "bg-black! border-gray-800!" : ""}`}>
      {/* Top bar */}
      <div className={`bg-black py-1.5 px-4 ${darkMode ? "bg-[#111]" : ""}`}>
        <div className="max-w-360 mx-auto flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium tracking-wide">
            South African Football. Every Day.
          </span>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>PSL Season 2024/25</span>
            <span className="w-px h-3 bg-gray-600" />
            <span>Bafana Bafana AFCON 2025</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={`px-4 ${darkMode ? "bg-black" : "bg-white"}`}>
        <div className="max-w-360 mx-auto flex items-center h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-green rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm font-display">
                DC
              </span>
            </div>
            <span
              className={`font-display font-bold text-xl tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
              Diski<span className="text-green">Central</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setOpenSubmenu(link.label)}
                  onMouseLeave={() => setOpenSubmenu(null)}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors ${
                      pathname.startsWith(link.href)
                        ? "text-green"
                        : darkMode
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-gray-900"
                    }`}>
                    {link.label}
                    <ChevronDown size={14} />
                  </Link>
                  {openSubmenu === link.label && (
                    <div
                      className={`absolute top-full left-0 mt-0 w-52 rounded-lg shadow-xl border py-1 z-50 ${darkMode ? "bg-charcoal border-gray-700" : "bg-white border-gray-100"}`}>
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`block px-4 py-2.5 text-sm transition-colors ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"}`}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    pathname === link.href
                      ? "text-green"
                      : darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                  }`}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search DiskiCentral..."
                  className={`w-56 px-3 py-1.5 text-sm border rounded-lg outline-none focus:border-green transition-colors ${darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1 p-1.5 rounded text-gray-500 hover:text-gray-700">
                  <X size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                aria-label="Search">
                <Search size={18} />
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
              aria-label="Toggle dark mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {!isLoading &&
              (user ? (
                <>
                  <Link
                    href="/profile"
                    className="hidden sm:block px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900">
                    {user.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => void logout().then(() => router.push("/"))}
                    className="hidden sm:block px-3 py-2 text-sm font-semibold text-gray-500 hover:text-gray-900">
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:block px-3 py-2 text-sm font-semibold text-green-dark hover:text-gray-900">
                  Sign in
                </Link>
              ))}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${darkMode ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`lg:hidden border-t ${darkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"}`}>
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? "bg-green-light text-green-dark"
                      : darkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}>
                  {link.label}
                </Link>
                {link.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {link.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className={`block px-3 py-2 text-sm rounded transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/admin"
                className="block px-3 py-2.5 text-sm font-medium text-green hover:bg-green-light rounded-lg transition-colors">
                Admin Panel
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
