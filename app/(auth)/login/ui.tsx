// app/(auth)/login/ui.tsx
"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginUI() {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setPending(true);
    setMsg(null);
    try {
      const res = await login(formData);
      if (!res?.ok) setMsg(res?.message ?? "登录失败");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent" />

      <div className="relative flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-[420px]">
          {/* Brand block */}
          <div className="mb-6">
            <div className="text-sm text-white/60">Onestep Holdings Corp.</div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              OneStep Console
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Supply Intelligence Console 
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">login</div>
              <div className="text-xs text-white/40">v2.4.0</div>
            </div>

            <form action={onSubmit} className="mt-4 space-y-3">
              <div>
                <div className="text-xs text-white/60">Password</div>
                <input
                  name="password"
                  type="password"
                  autoFocus
                  placeholder="password"
                  className="mt-2 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
                />
                <div className="mt-2 text-[11px] text-white/35">
                  Authorized personnel only。
                </div>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition disabled:opacity-60"
              >
                {pending ? "login…" : "login"}
              </button>

              {msg ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {msg}
                </div>
              ) : null}
            </form>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-white/35">
            © {new Date().getFullYear()} OneStep — Internal Use Only
          </div>
        </div>
      </div>
    </div>
  );
}