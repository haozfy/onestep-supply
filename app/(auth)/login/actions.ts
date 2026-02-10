"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/app/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "请输入邮箱和密码" };
  }

  // ✅ 修复点：加上 await
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "邮箱或密码错误" };
  }

  // 登录成功 → 进入控制台
  redirect("/app");
}
