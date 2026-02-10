"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

type Role = "admin" | "ops" | "client";

function makeToken(role: Role) {
  const secret = process.env.APP_AUTH_SECRET!;
  const payload = `${role}:${Date.now()}`;
  const sig = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${payload}.${sig}`;
}

function verifyPassword(password: string): Role | null {
  if (password === process.env.APP_ADMIN_PASSWORD) return "admin";
  if (password === process.env.APP_OPS_PASSWORD) return "ops";
  if (password === process.env.APP_CLIENT_PASSWORD) return "client";
  return null;
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "").trim();

  const role = verifyPassword(password);
  if (!role) {
    return { error: "密码错误" };
  }

  const token = makeToken(role);

  // ✅ 正确的 cookies 用法
  const cookieStore = await cookies();

  cookieStore.set("os_role", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/app");
}