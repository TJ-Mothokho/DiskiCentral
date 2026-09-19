export const Role = {
  Admin: 0,
  Editor: 1,
  Journalist: 2,
  Contributor: 3,
  User: 4,
} as const;

export type RoleId = (typeof Role)[keyof typeof Role];
export type RoleValue = RoleId | string | number | null | undefined;

const roleNameToId: Record<string, RoleId> = {
  admin: Role.Admin,
  editor: Role.Editor,
  journalist: Role.Journalist,
  contributor: Role.Contributor,
  user: Role.User,
};

export function normalizeRole(role: RoleValue): RoleId | null {
  if (typeof role === "number" && Number.isInteger(role)) {
    return isKnownRole(role) ? role : null;
  }

  if (typeof role !== "string") return null;

  const trimmed = role.trim();
  if (!trimmed) return null;

  const numeric = Number(trimmed);
  if (Number.isInteger(numeric) && isKnownRole(numeric)) return numeric;

  return roleNameToId[trimmed.toLowerCase()] ?? null;
}

export function isKnownRole(role: number): role is RoleId {
  return role >= Role.Admin && role <= Role.User;
}

export function isAdmin(role: RoleValue): boolean {
  return normalizeRole(role) === Role.Admin;
}

export function canAccessAdminPanel(role: RoleValue): boolean {
  const normalized = normalizeRole(role);
  return normalized !== null && normalized !== Role.User;
}

export function canWriteArticles(role: RoleValue): boolean {
  const normalized = normalizeRole(role);
  return (
    normalized === Role.Admin ||
    normalized === Role.Journalist ||
    normalized === Role.Contributor
  );
}

export function canEditArticles(role: RoleValue): boolean {
  const normalized = normalizeRole(role);
  return normalized === Role.Admin || normalized === Role.Journalist;
}

export function canPublishArticles(role: RoleValue): boolean {
  const normalized = normalizeRole(role);
  return normalized === Role.Admin || normalized === Role.Editor;
}

export function canDeleteArticles(role: RoleValue): boolean {
  const normalized = normalizeRole(role);
  return normalized === Role.Admin || normalized === Role.Editor;
}

export function canManageUsers(role: RoleValue): boolean {
  return isAdmin(role);
}
