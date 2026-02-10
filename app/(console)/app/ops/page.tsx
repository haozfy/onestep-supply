import { SectionHeader, StatCard, PrimaryButton, SecondaryButton } from "../../ui/widgets";

export default function OpsConsole() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="乙方运营"
        desc="录入生产批次 / 交付记录；执行端只写事实，不改“销售确认”。"
        action={
          <div className="flex gap-2">
            <SecondaryButton>生产历史</SecondaryButton>
            <PrimaryButton>新增生产批次</PrimaryButton>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="本月已生产" value="— L" hint="批次汇总（周录入）" />
        <StatCard title="本月已交付" value="— L" hint="交付记录汇总" />
        <StatCard title="可交付库存" value="— L" hint="生产 - 交付（可选）" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Panel title="待处理">
          <EmptyLine text="暂无待审核/待处理事项（接入数据后自动出现）。" />
        </Panel>

        <Panel title="快速录入（示例）">
          <div className="grid grid-cols-1 gap-3">
            <Input label="批次号" placeholder="例如 QB-2026-0210-A" />
            <Input label="本批产量（L）" placeholder="例如 50" />
            <Input label="备注（可选）" placeholder="QC / 返工 / 原料批次…" />
          </div>
          <div className="mt-4 flex gap-2">
            <SecondaryButton>保存草稿</SecondaryButton>
            <PrimaryButton>提交批次</PrimaryButton>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function EmptyLine({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 text-sm text-white/70">
      {text}
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
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
