"use client";

import { useEffect, useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UsersService } from "@/services/UserService";
import type { User } from "@/types/user";
import { canManageUsers, normalizeRole, Role, type RoleId } from "@/types/roles";

const usersService = new UsersService();

const roleLabels: Record<RoleId, string> = {
  [Role.Admin]: "Admin",
  [Role.Editor]: "Editor",
  [Role.Journalist]: "Journalist",
  [Role.Contributor]: "Contributor",
  [Role.User]: "User",
};

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const canManage = canManageUsers(user?.role);

  useEffect(() => {
    if (!canManage) {
      setLoading(false);
      return;
    }

    void usersService
      .getApiUsers()
      .then((response) => setUsers(response.data ?? []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, [canManage]);

  const { employees, publicUsers } = useMemo(
    () => ({
      employees: users.filter((person) => {
        const role = normalizeRole(person.role);
        return role !== null && role !== Role.User;
      }),
      publicUsers: users.filter((person) => normalizeRole(person.role) === Role.User),
    }),
    [users],
  );

  if (!canManage) {
    return (
      <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-sm text-red-200">
        <ShieldAlert size={24} className="mb-3 text-red-300" />
        Only admins can manage users and employees.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-display font-bold text-white">Users</h1>
        <p className="text-xs text-gray-500 mt-1">
          {loading ? "Loading users..." : `${users.length} accounts`}
        </p>
      </div>

      <UserTable title="Employees" users={employees} loading={loading} />
      <UserTable title="Users" users={publicUsers} loading={loading} />
    </div>
  );
}

function UserTable({
  title,
  users,
  loading,
}: {
  title: string;
  users: User[];
  loading: boolean;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#111]">
      <div className="border-b border-gray-800 px-4 py-3">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-gray-900/50">
          <tr>
            {["Name", "Email", "Role", "Status"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((person) => {
            const role = normalizeRole(person.role);
            return (
              <tr key={person.id} className="border-t border-gray-800">
                <td className="px-4 py-3 font-medium text-gray-200">{person.name}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{person.email}</td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {role === null ? String(person.role) : roleLabels[role]}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {person.active ? "Active" : "Inactive"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!loading && users.length === 0 && (
        <p className="p-8 text-center text-sm text-gray-500">No records found.</p>
      )}
    </div>
  );
}
