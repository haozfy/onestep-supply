// app/(auth)/login/ui.tsx
"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginUI() {
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-xl items-center px-6">
        <div className="w-full rounded-2xl border border-white/[0.10] bg-white/[0.04] p-6 backdrop-blur">
          <div className="text-lg font-semibold">登录</div>
          <div className="mt-1 text-sm text-white/60">
            请输入系统分配的登录密码
          </div>

          <form
            className="mt-5 space-y-3"
            action={async (fd) => {
              const res = await login(fd);
              if (res && !res.ok) setErr(res.message);
            }}
          >
            <div>
              <div className="text-xs text-white/60">Password</div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="输入密码"
                className="mt-2 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
              />
            </div>

            <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition">
              登录
            </button>

            {err ? (
              <div className="rounded-xl border border-white/[0.10] bg-white/[0.03] p-3 text-sm text-white/70">
                {err}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}