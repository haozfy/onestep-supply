"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginUI() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/[0.10] bg-white/[0.04] p-6">
        <div className="text-lg font-semibold">Onestep Supply Console</div>
        <div className="mt-1 text-sm text-white/60">
          输入密码登录（Admin / Ops / Client）
        </div>

        <form
          className="mt-6 space-y-3"
          action={async (formData) => {
            setError(null);
            const res = await login(formData);
            if (res?.error) setError(res.error);
          }}
        >
          <div>
            <div className="text-xs text-white/60">密码</div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
              required
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition">
            登录
          </button>
        </form>

        <div className="mt-4 text-[12px] text-white/40">
          提示：此版本为“密码即角色”。后续可升级为 Supabase + 白名单账号。
        </div>
      </div>
    </div>
  );
}