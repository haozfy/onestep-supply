"use server";

import { redirect } from "next/navigation";
// 1. 导入名要和上面定义的一致 (createClient)
import { createClient } from "@/app/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  // 2. 调用 createClient (记得它是 async 的，虽然 await 不是强制要求，但在某些上下文中是好习惯)
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // 建议：带上具体的错误信息，或者只带错误码
    // redirect(`/login?error=${encodeURIComponent(error.message)}`);
    return redirect("/login?e=1");
  }

  // 登录成功跳转
  redirect("/app");
}
