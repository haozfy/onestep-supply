import { getRole, roleLabel } from "@/app/lib/auth";

export async function Topbar() {
  const role = await getRole();

  const name =
    role === "admin" ? "Hao" :
    role === "ops" ? "Zhou" :
    role === "client" ? "Tao" :
    "Guest";

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#0a0a0c]/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <div className="text-sm text-white/60">
          Supply Console
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm text-white/70">
            {name} <span className="text-white/40">({roleLabel(role)})</span>
          </div>
        </div>
      </div>
    </header>
  );
}