import "../globals.css";
import { Sidebar } from "./ui/sidebar";
import { Topbar } from "./ui/topbar";
import { getRole } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getRole();
  if (role === "unknown") redirect("/login");

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex-1 xl:ml-[280px]">
          <Topbar />
          <main className="mx-auto max-w-6xl px-6 pb-16 pt-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}