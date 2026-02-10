// app/lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// 1. 函数必须标记为 async
export async function createServerSupabaseClient() {
  // 2. cookies() 需要 await
  const cookieStore = await cookies();

  return createServerClient(
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
              cookieStore.set(name, value, options);
            });
          } catch {
            // no-op
            // 这里的 try-catch 是为了忽略在 Server Component 中写入 cookie 时的报错
            // 这在 Supabase 官方文档中也是推荐的做法
          }
        },
      },
    }
  );
}
