import { Search, Bell } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/[0.08] bg-[#0a0a0c]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-white/40" size={16} />
            <input
              placeholder="Search…（后续可搜批次 / 月份 / 记录）"
              className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/[0.18]"
            />
          </div>
        </div>

        <button className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-2 text-white/70 hover:text-white hover:bg-white/[0.06] transition">
          <Bell size={16} />
        </button>

        <div className="rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2">
          <div className="text-xs text-white/60">当前账号</div>
          <div className="text-sm font-medium">Hao (Admin)</div>
        </div>
      </div>
    </header>
  );
}
