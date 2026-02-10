"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Role = "admin" | "ops" | "client";

function roleFromPassword(pwdRaw: string): Role | null {
  const pwd = (pwdRaw ?? "").trim(); // 去空格，避免你复制粘贴多了空格

  // ✅ 你的三套密码（大小写敏感）
  if (pwd === "Hao") return "admin";
  if (pwd === "Zhou") return "ops";
  if (pwd === "Tao") return "client";

  return null;
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const role = roleFromPassword(password);

  if (!role) {
    // 让 UI 显示错误（不 redirect）
    return { ok: false, message: "密码错误" };
  }

  // ✅ 注意：在你当前环境 cookies() 要 await
  const cookieStore = await cookies();

  cookieStore.set("os_role", role, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30天
  });

  // 登录后按角色跳转
  if (role === "admin") redirect("/app");
  if (role === "ops") redirect("/app/ops");
  redirect("/app/client");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("os_role", "", { path: "/", maxAge: 0 });
  redirect("/login");
}