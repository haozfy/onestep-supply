"use client";

import { useState } from "react";
import { login } from "./actions";

export default function LoginUI() {
  const [msg, setMsg] = useState<string>("");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center px-6">
      <form
        action={async (fd) => {
          setMsg("");
          const res = await login(fd);
          setMsg(JSON.stringify(res));
        }}
        className="w-full max-w-sm rounded-2xl border border-white/[0.10] bg-white/[0.04] p-6"
      >
        <div className="text-lg font-semibold">登录</div>

        <div className="mt-5">
          <div className="text-xs text-white/60">Password</div>
          <input
            name="password"              // ✅ 必须是 password
            type="text"                 // ✅ 先用 text，避免自动填充/隐藏干扰
            autoComplete="off"
            placeholder="Hao / Zhou / Tao"
            className="mt-2 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition"
        >
          登录
        </button>

        {msg ? (
          <pre className="mt-4 whitespace-pre-wrap rounded-xl border border-white/[0.10] bg-black/30 p-3 text-xs text-white/80">
            {msg}
          </pre>
        ) : null}
      </form>
    </div>
  );
}