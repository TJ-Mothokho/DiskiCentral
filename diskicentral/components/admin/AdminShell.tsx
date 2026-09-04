"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  Calendar,
  ChevronRight,
  Database,
  FileText,
  Globe,
  Image,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Newspaper,
  Settings,
  Tag,
  Trophy,
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
      { label: "Categories", href: "/admin/categories", icon: Tag },
      { label: "Videos", href: "/admin/videos", icon: Video },
      { label: "Authors", href: "/admin/authors", icon: Users },
    ],
  },
  {
    title: "Football Data",
    items: [
      { label: "Teams", href: "/admin/teams", icon: Globe },
      { label: "Players", href: "/admin/players", icon: Users },
      { label: "Competitions", href: "/admin/competitions", icon: Trophy },
      { label: "Fixtures", href: "/admin/fixtures", icon: Calendar },
      {
        label: "Transfers",
        href: "/admin/transfers-mgmt",
        icon: ArrowLeftRight,
      },
    ],
  },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);
  const activeLabel =
    sidebarSections
      .flatMap((section) => section.items)
      .find((item) => isActive(item.href))?.label ?? "Admin";

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
          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                {section.title}
              </p>
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
                    {active && <ChevronRight size={12} className="ml-auto" />}
                  </Link>
                );
              })}
            </div>
          ))}
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
          <div className="w-7 h-7 bg-[#00C853] rounded-full flex items-center justify-center text-black font-bold text-xs">
            A
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
}
