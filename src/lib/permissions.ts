export function hasAccess(role: string | null, requiredRole: string) {
  const roles = ["standat", "premium", "interprise"];
  return roles.indexOf(role || "") >= roles.indexOf(requiredRole);
}
