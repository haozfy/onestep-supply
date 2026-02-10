import { SectionHeader, StatCard, SecondaryButton, PrimaryButton } from "../../ui/widgets";

export default function AdminGlobal() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="全局总览（你专用）"
        desc="甲方事实 + 乙方事实 + 历史对账入口。你在加拿大收钱，这页是你的主控台。"
        action={
          <div className="flex gap-2">
            <SecondaryButton>导出对账</SecondaryButton>
            <PrimaryButton>新增销售确认</PrimaryButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="累计已销售" value="— L" hint="销售确认账" />
        <StatCard title="累计已生产" value="— L" hint="批次汇总" />
        <StatCard title="累计已交付" value="— L" hint="交付汇总" />
        <StatCard title="未交付缺口" value="— L" hint="销售-交付" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Block title="甲方概览">
          <MiniRow k="已确认投产台数" v="— 台" />
          <MiniRow k="本月预计消耗" v="— L" />
          <MiniRow k="计划投产（未来1–3月）" v="— 台" />
          <MiniRow k="供给状态" v="—" />
        </Block>

        <Block title="乙方执行概览">
          <MiniRow k="可交付库存" v="— L" />
          <MiniRow k="本月生产" v="— L" />
          <MiniRow k="本月交付" v="— L" />
          <MiniRow k="风险提示" v="—" />
        </Block>
      </div>

      <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
        <div className="text-sm font-medium">历史记录（统一入口）</div>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <ActionTile title="甲方申报历史" desc="机器数（月）申报与审核轨迹" />
          <ActionTile title="生产批次历史" desc="批次号、产量、状态、负责人" />
          <ActionTile title="交付与对账历史" desc="交付量、批次关联、缺口闭环" />
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function MiniRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
      <div className="text-sm text-white/70">{k}</div>
      <div className="text-sm font-medium">{v}</div>
    </div>
  );
}

function ActionTile({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.03] p-4 hover:bg-white/[0.05] transition">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-xs text-white/60">{desc}</div>
    </div>
  );
}
