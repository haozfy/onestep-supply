// app/lib/auth.ts
import { cookies } from "next/headers";
import { createHmac } from "crypto";

export type Role = "admin" | "ops" | "client";

const COOKIE_NAME = "os_role";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function sign(payload: string) {
  const secret = mustEnv("APP_AUTH_SECRET");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function issueRoleToken(role: Role) {
  const payload = `${role}.${Date.now()}`; // role.timestamp
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifyRoleToken(token: string | undefined | null): Role | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const role = parts[0] as Role;
  if (!["admin", "ops", "client"].includes(role)) return null;

  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2];
  if (sig !== sign(payload)) return null;

  return role;
}

export async function getRole(): Promise<Role | null> {
  const store = await cookies();
  return verifyRoleToken(store.get(COOKIE_NAME)?.value);
}

export async function setRole(role: Role) {
  const store = await cookies();
  store.set(COOKIE_NAME, issueRoleToken(role), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30天
  });
}

export async function clearRole() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function roleFromPassword(raw: string): Role | null {
  const pwd = raw.trim();

  const admin = mustEnv("APP_ADMIN_PASSWORD");
  const ops = mustEnv("APP_OPS_PASSWORD");
  const client = mustEnv("APP_CLIENT_PASSWORD");

  if (pwd === admin) return "admin";
  if (pwd === ops) return "ops";
  if (pwd === client) return "client";
  return null;
}