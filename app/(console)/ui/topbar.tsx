// app/(console)/ui/topbar.tsx
import Link from "next/link";
import { getRole } from "@/app/lib/auth";

function label(role: string | null) {
  if (role === "admin") return "Hao (Admin)";
  if (role === "ops") return "Zhou (Ops)";
  if (role === "client") return "Tao (Client)";
  return "Guest";
}

export async function Topbar() {
  const role = await getRole();

  return (
    <div className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#0a0a0c]/60 backdrop-blur">
      {/* ✅ 同样不要 max-w-6xl，避免居中造成“空” */}
      <div className="flex items-center justify-between px-6 py-4 xl:px-8">
        <div className="text-sm text-white/60">OneStep Supply Console</div>

        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">{label(role)}</div>

          <Link
            href="/logout"
            className="rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-sm text-white/80 hover:bg-white/[0.06] hover:text-white transition"
          >
            退出
          </Link>
        </div>
      </div>
    </div>
  );
}