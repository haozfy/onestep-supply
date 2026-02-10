// app/(console)/layout.tsx
import "../globals.css";
import { Sidebar } from "./ui/sidebar";
import { Topbar } from "./ui/topbar";
import { getRole } from "@/app/lib/auth";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const role = await getRole();
  const showSidebar = role === "admin";

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      <div className="relative flex min-h-screen">
        {showSidebar ? <Sidebar /> : null}

        {/* 如果没有 sidebar，把内容顶到左边 */}
        <div className={showSidebar ? "flex-1 xl:pl-[280px]" : "flex-1"}>
          <Topbar />
          <main className="mx-auto max-w-6xl px-6 pb-16 pt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}