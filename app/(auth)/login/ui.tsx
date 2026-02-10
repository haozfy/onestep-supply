export default function LoginUI({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full space-y-6">
          <div>
            <div className="text-2xl font-semibold tracking-tight">Onestep Supply</div>
            <div className="mt-1 text-sm text-white/60">仅限授权账户使用</div>
          </div>

          <form action={action} className="space-y-4">
            <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5 space-y-3">
              <div>
                <div className="text-xs text-white/60 mb-1">Email</div>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/[0.20]"
                />
              </div>

              <div>
                <div className="text-xs text-white/60 mb-1">Password</div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/[0.20]"
                />
              </div>

              <button className="w-full rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition">
                登录
              </button>
            </div>

            <div className="text-xs text-white/40">
              操作将被记录 · 域名/SSL/部署由 Vercel 管理
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}