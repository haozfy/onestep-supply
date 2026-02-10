"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginUI() {
  const [err, setErr] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-6">
      <form
        action={async (fd) => {
          setErr("");
          const res = await login(fd);
          if (res && !res.ok) setErr(res.message || "密码错误");
        }}
        className="w-full max-w-sm rounded-2xl border border-white/[0.10] bg-white/[0.04] p-6"
      >
        <div className="text-lg font-semibold">登录</div>
        <div className="mt-1 text-sm text-white/60">
          输入密码进入对应门户
        </div>

        <div className="mt-5">
          <div className="text-xs text-white/60">Password</div>
          <input
            name="password"
            type="password"
            placeholder="Hao / Zhou / Tao"
            className="mt-2 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
          />
        </div>

        {err ? (
          <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {err}
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition"
        >
          登录
        </button>
      </form>
    </div>
  );
}