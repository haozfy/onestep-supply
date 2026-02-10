// app/(auth)/login/actions.ts
"use server";

import { redirect } from "next/navigation";
import { roleFromPassword, setRole } from "@/app/lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");

  const role = roleFromPassword(password);
  if (!role) {
    return { ok: false, message: "密码错误" };
  }

  await setRole(role);

  // 登录后按角色去默认页
  if (role === "client") redirect("/app/client");
  if (role === "ops") redirect("/app/ops");
  redirect("/app"); // admin
}