import "../globals.css";
import { Sidebar } from "./ui/sidebar";
import { Topbar } from "./ui/topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-x-hidden">
      {/* ✅ 背景层：不抢事件 + 明确在底层 */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      {/* ✅ 主体层：z-10 确保在背景之上 */}
      <div className="relative z-10 flex min-h-screen">
        <Sidebar />

        {/* ✅ 关键：min-w-0 防止内容溢出把侧边栏挤/盖 */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}