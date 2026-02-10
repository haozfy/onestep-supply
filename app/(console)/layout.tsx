import "../globals.css";
import { Sidebar } from "./ui/sidebar";
import { Topbar } from "./ui/topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="mx-auto max-w-6xl px-6 pb-16 pt-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
