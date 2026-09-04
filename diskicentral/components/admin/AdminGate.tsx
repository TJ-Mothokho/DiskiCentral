"use client";

import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center text-sm text-gray-400">
        Checking access...
      </div>
    );
  }

  const hasAdminRole =
    user !== null && Number.isInteger(user.role) && user.role < 3;
  if (!hasAdminRole) {
    return (
      <main className="min-h-screen bg-[#0F0F0F] text-gray-300 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <ShieldAlert size={48} className="mx-auto mb-5 text-red-400" />
          <h1 className="font-display font-bold text-3xl text-white mb-3">
            Access denied
          </h1>
          <p className="text-sm leading-relaxed text-gray-400">
            You must be signed in with an administrator role to access this
            area.
          </p>
        </div>
      </main>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
