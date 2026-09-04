"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Bookmark,
  Calendar,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Database,
  FileText,
  Globe,
  History,
  Image,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  PenSquare,
  Settings,
  Shield,
  Tag,
  Trophy,
  User,
  UserCog,
  UserRound,
  Users,
  Video,
  X,
} from "lucide-react";

const sidebarSections = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Content",
    items: [
      { label: "Articles", href: "/admin/articles", icon: FileText },
      { label: "Categories", href: "/admin/categories", icon: Bookmark },
      { label: "Tags", href: "/admin/tags", icon: Tag },
      { label: "Videos", href: "/admin/videos", icon: Video },
    ],
  },
  {
    title: "Football Core",
    items: [
      { label: "Teams", href: "/admin/teams", icon: Shield },
      { label: "Players", href: "/admin/players", icon: Users },
      { label: "Competitions", href: "/admin/competitions", icon: Trophy },
      { label: "Seasons", href: "/admin/seasons", icon: Calendar },
    ],
  },
  {
    title: "Matches",
    items: [
      { label: "Fixtures", href: "/admin/fixtures", icon: CalendarClock },
      { label: "Results", href: "/admin/results", icon: ClipboardList },
      { label: "Standings", href: "/admin/standings", icon: ListOrdered },
    ],
  },
  {
    title: "Transfers Centre",
    items: [
      {
        label: "Transfers",
        href: "/admin/transfers-mgmt",
        icon: ArrowLeftRight,
      },
      {
        label: "Player History",
        href: "/admin/playerteamhistory",
        icon: History,
      },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Authors", href: "/admin/authors", icon: PenSquare },
      { label: "Employees", href: "/admin/users", icon: UserCog }, // where user role is less than 3
      { label: "Users", href: "/admin/users", icon: UserRound }, // where user role is 3
    ],
  },
  // ignore everything below
  {
    title: "Media & Engagement",
    items: [
      { label: "Media Library", href: "/admin/media", icon: Image },
      { label: "Comments", href: "/admin/comments", icon: MessageSquare },
      { label: "Newsletter", href: "/admin/newsletter", icon: Newspaper },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "JSON Database", href: "/admin/database", icon: Database },
    ],
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);
  const activeSection = sidebarSections.find((section) =>
    section.items.some((item) => isActive(item.href)),
  )?.title;
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => (activeSection ? { [activeSection]: true } : {}),
  );
  const toggleSection = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  const activeLabel =
    sidebarSections
      .flatMap((section) => section.items)
      .find((item) => isActive(item.href))?.label ?? "Admin";
  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "A";

  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  async function handleLogout() {
    setProfileMenuOpen(false);
    await logout();
    router.push("/");
  }

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] text-gray-300">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#0A0A0A] border-r border-gray-800 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-[#00C853] rounded flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-xs">DC</span>
          </div>
          <span className="font-display font-bold text-white text-sm">
            DiskiCentral <span className="text-[#00C853]">Admin</span>
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {sidebarSections.map((section) => {
            const sectionOpen = !!openSections[section.title];
            return (
              <div key={section.title} className="mb-2">
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-600 hover:text-gray-400">
                  {section.title}
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${sectionOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {sectionOpen && (
                  <div className="mt-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5 ${active ? "bg-[#00C853]/10 text-[#00C853]" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
                          <Icon size={15} />
                          {item.label}
                          {active && (
                            <ChevronRight size={12} className="ml-auto" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="px-4 py-3 border-t border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300">
            <Globe size={12} />
            View Site
          </Link>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        <header className="h-14 bg-[#0A0A0A] border-b border-gray-800 flex items-center px-4 gap-3 shrink-0">
          <button
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 rounded text-gray-400 hover:text-white">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex-1">
            <span className="text-xs text-gray-500 font-medium">
              {activeLabel}
            </span>
          </div>
          <Bell size={16} className="text-gray-400" />
          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              aria-label="Open profile menu"
              onClick={() => setProfileMenuOpen((open) => !open)}
              className="w-7 h-7 bg-[#00C853] rounded-full flex items-center justify-center text-black font-bold text-xs">
              {initials}
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 top-9 z-50 w-48 rounded-lg border border-gray-800 bg-[#161616] py-1 shadow-xl">
                {user && (
                  <div className="px-3 py-2 border-b border-gray-800">
                    <p className="text-xs font-semibold text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                )}
                <Link
                  href="/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white">
                  <User size={13} />
                  View Profile
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setProfileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white">
                  <Settings size={13} />
                  Edit Profile
                </Link>
                <button
                  type="button"
                  onClick={() => void handleLogout()}
                  className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-gray-800 hover:text-red-300">
                  <LogOut size={13} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
}
