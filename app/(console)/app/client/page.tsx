import { SectionHeader, StatCard, PrimaryButton, SecondaryButton } from "../../ui/widgets";

export default function ClientPortal() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="泽天春来"
        desc="试剂需求自动计算"
        action={
          <div className="flex gap-2">
            <SecondaryButton>查看历史</SecondaryButton>
            <PrimaryButton>提交本月需求</PrimaryButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="已确认投产台数" value="— 台" hint="以乙方确认结果为准" />
        <StatCard title="本月预计消耗" value="— L" hint="1.728 L/台/月 × 投产台数" />
        <StatCard title="供给状态" value="—" hint="🟢正常 / 🟡紧张 / 🔴受限" />
      </div>

      <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
        <div className="text-sm font-medium">本月申报（示例布局）</div>
        <p className="mt-1 text-sm text-white/60">
          V1：已投产 / 计划投产 / 已销售未生产。
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <Field label="当前已投产机器数（必填）" placeholder="" />
          <Field label="未来计划投产（选填）" placeholder="" />
          <Field label="已销售未生产（选填）" placeholder="" />
        </div>

        <div className="mt-4 flex gap-2">
          <SecondaryButton>保存草稿</SecondaryButton>
          <PrimaryButton>提交（进入待确认）</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <div className="text-xs text-white/60">{label}</div>
      <input
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/[0.18]"
      />
    </div>
  );
}
