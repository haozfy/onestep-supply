"use client";

import { useState } from "react";
import { login } from "./actions";

export function LoginCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-8 backdrop-blur">
      <header className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight">
          Onestep Supply
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Supply Intelligence Console
        </p>
      </header>

      <form
        action={async (formData) => {
          setLoading(true);
          setError(null);
          const res = await login(formData);
          if (res?.error) {
            setError(res.error);
            setLoading(false);
          }
        }}
        className="space-y-4"
      >
        <Field label="邮箱">
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
          />
        </Field>

        <Field label="密码">
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
          />
        </Field>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-white py-2 text-sm font-medium text-black hover:bg-white/90 transition disabled:opacity-60"
        >
          {loading ? "正在登录…" : "登录"}
        </button>
      </form>

      <footer className="mt-6 text-xs text-white/40">
        仅限授权账户使用 · 操作将被记录
      </footer>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-white/60">{label}</div>
      {children}
    </div>
  );
}