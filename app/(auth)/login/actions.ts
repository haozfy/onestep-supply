"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

type Role = "admin" | "ops" | "client";

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function makeToken(role: Role) {
  const secret = process.env.APP_AUTH_SECRET;
  if (!secret) throw new Error("Missing APP_AUTH_SECRET");

  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30天
  const payload = `${role}.${exp}`;
  const sig = sign(payload, secret);
  return `${payload}.${sig}`;
}

function verifyToken(token: string | undefined | null): Role | null {
  if (!token) return null;
  const secret = process.env.APP_AUTH_SECRET;
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const role = parts[0] as Role;
  const exp = Number(parts[1]);
  const sig = parts[2];

  if (!["admin", "ops", "client"].includes(role)) return null;
  if (!Number.isFinite(exp) || Date.now() > exp) return null;

  const expected = sign(`${role}.${exp}`, secret);
  if (expected !== sig) return null;

  return role;
}

function roleHome(role: Role) {
  if (role === "client") return "/app/client";
  if (role === "ops") return "/app/ops";
  return "/app/admin";
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "").trim();
  if (!password) return { error: "请输入密码" };

  const admin = process.env.APP_ADMIN_PASSWORD || "";
  const ops = process.env.APP_OPS_PASSWORD || "";
  const client = process.env.APP_CLIENT_PASSWORD || "";

  let role: Role | null = null;
  if (password === admin) role = "admin";
  else if (password === ops) role = "ops";
  else if (password === client) role = "client";

  if (!role) return { error: "密码不正确" };

  const token = makeToken(role);
  cookies().set("os_role", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  redirect(roleHome(role));
}

export async function logout() {
  cookies().set("os_role", "", { path: "/", maxAge: 0 });
  redirect("/login");
}

// 给 middleware/页面使用（可选）
export async function getRoleFromCookie(): Promise<Role | null> {
  const token = cookies().get("os_role")?.value;
  return verifyToken(token);
}