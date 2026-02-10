import { cookies } from "next/headers";
import crypto from "crypto";

export type Role = "admin" | "ops" | "client" | "unknown";

export async function getRole(): Promise<Role> {
  const cookieStore = await cookies();
  const token = cookieStore.get("os_role")?.value;
  if (!token) return "unknown";

  const secret = process.env.APP_AUTH_SECRET!;
  const parts = token.split(".");
  if (parts.length !== 2) return "unknown";

  const payload = parts[0]; // role:timestamp
  const sig = parts[1];

  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (sig !== expected) return "unknown";

  const role = payload.split(":")[0];
  if (role === "admin" || role === "ops" || role === "client") return role;
  return "unknown";
}

export function roleLabel(role: Role) {
  if (role === "admin") return "Admin";
  if (role === "ops") return "Ops";
  if (role === "client") return "Client";
  return "Guest";
}