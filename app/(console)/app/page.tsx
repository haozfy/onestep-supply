import { StatCard } from "./ui/widgets";

export default function Overview() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">总览</h1>
          <p className="mt-1 text-sm text-white/60">
            单一事实源：机器 → 消耗（1.728 L/台/月）→ 销售确认 → 生产批次 → 交付闭环
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="本月预计消耗" value="— L" hint="基于已确认投产台数自动计算" />
        <StatCard title="累计已销售" value="— L" hint="以销售确认表为准（你可控）" />
        <StatCard title="未交付缺口" value="— L" hint="销售 - 交付（风险）" />
      </div>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
          <div className="text-sm font-medium">近期事件</div>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              还没有事件。下一步接入：甲方申报 / 生产批次 / 交付记录。
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
          <div className="text-sm font-medium">风险提示</div>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              未来 4–8 周缺口与紧张状态将在这里自动标红（接数据后）。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}