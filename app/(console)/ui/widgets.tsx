export function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
      <div className="text-xs font-medium tracking-wide text-white/60">
        {title}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      {hint ? <div className="mt-2 text-sm text-white/50">{hint}</div> : null}
    </div>
  );
}

export function SectionHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="text-lg font-semibold">{title}</div>
        {desc ? <div className="mt-1 text-sm text-white/60">{desc}</div> : null}
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90 transition">
      {children}
    </button>
  );
}

export function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/[0.06] hover:text-white transition">
      {children}
    </button>
  );
}