"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LayoutGrid, Factory, Users, Shield, Settings } from "lucide-react";
import { BRAND } from "@/app/ui/brand";
import { cn } from "@/app/ui/cn";

function NavItem({
  href,
  icon,
  title,
  tag,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  tag?: string;
}) {
  const pathname = usePathname();
  const active =
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-white/[0.10] text-white"
          : "text-white/60 hover:bg-white/[0.06] hover:text-white"
      )}
    >
      <span className={active ? "text-white" : "text-white/50"}>
        {icon}
      </span>
      <span className="flex-1 font-medium">{title}</span>
      {tag && (
        <span className="rounded-md bg-white/[0.08] px-1.5 py-0.5 text-[10px] text-white/50">
          {tag}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-[280px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0a0a0c] xl:flex">
      {/* Brand */}
      <div className="px-5 py-6">
        <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-4">
          <div className="text-sm font-semibold">{BRAND.name}</div>
          <div className="mt-1 text-xs text-white/40">
            {BRAND.tagline}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 space-y-6 px-4">
        <div>
          <div className="mb-2 px-2 text-[10px] font-semibold tracking-widest text-white/30">
            CONSOLE
          </div>
          <div className="space-y-1">
            <NavItem href="/app" icon={<LayoutGrid size={18} />} title="总览" />
            <NavItem
              href="/app/client"
              icon={<Users size={18} />}
              title="甲方门户"
              tag="Client"
            />
            <NavItem
              href="/app/ops"
              icon={<Factory size={18} />}
              title="乙方运营"
              tag="Ops"
            />
            <NavItem
              href="/app/admin"
              icon={<Shield size={18} />}
              title="全局管理"
              tag="Admin"
            />
          </div>
        </div>

        <div>
          <div className="mb-2 px-2 text-[10px] font-semibold tracking-widest text-white/30">
            SYSTEM
          </div>
          <NavItem
            href="/app/settings"
            icon={<Settings size={18} />}
            title="设置"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-6 pt-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-white/80">
              System Online
            </span>
          </div>
          <div className="mt-2 text-[10px] text-white/40">
            Production Environment
            <br />
            v2.4.0 (Stable)
          </div>
        </div>
      </div>
    </aside>
  );
}