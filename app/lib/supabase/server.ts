import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr"; // 引入类型
import type { Database } from "@/types/supabase"; // 假设你有生成的类型文件

export async function createClient() {
  // 1. Next.js 15 中 cookies() 需要 await
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as CookieOptions); // 类型断言
            });
          } catch {
            // 这个 try/catch 块是为了处理 Server Components。
            // 在 Server Component 中无法设置 cookie，set 方法会抛错，
            // 但我们希望它可以“静默失败”，仅用于 Server Actions / Route Handlers。
          }
        },
      },
    }
  );
}
