import "../globals.css";
import { Sidebar } from "./ui/sidebar";
import { Topbar } from "./ui/topbar";
import { getRole } from "@/app/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getRole();
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      <div className="relative min-h-screen">
        {/* ✅ 只有 Admin 才显示 Sidebar */}
        {isAdmin ? <Sidebar /> : null}

        {/* ✅ Admin 才需要给内容区让出左侧 280px */}
        <div className={isAdmin ? "xl:pl-[280px]" : ""}>
          <Topbar />
          <main className="mx-auto max-w-6xl px-6 pb-16 pt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}