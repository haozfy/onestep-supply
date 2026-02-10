// app/(console)/ui/topbar.tsx
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-sm text-white/60">OneStep Supply Console</div>
        <div className="text-sm font-medium">{label(role)}</div>
      </div>
    </div>
  );
}