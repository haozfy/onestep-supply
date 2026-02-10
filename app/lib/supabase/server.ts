import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function createClient() {
  // 1. Next.js 15: cookies() 是异步的，必须 await
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
              // 2. 这里的 options 需要类型断言
              cookieStore.set(name, value, options as CookieOptions);
            });
          } catch {
            // Server Component 阶段忽略写入错误
          }
        },
      },
    }
  );
}
