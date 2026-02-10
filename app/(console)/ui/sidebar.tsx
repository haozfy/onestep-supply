"use client"; // 1. 必须声明为 Client Component 才能获取当前路径高亮菜单

import Link from "next/link"; // 2. 修正：Import -> import
import { usePathname } from "next/navigation"; // 引入路径钩子
import { ReactNode } from "react";
import { BRAND } from "@/app/ui/brand";
import { LayoutGrid, Factory, Users, Shield, Settings } from "lucide-react";
import { cn } from "@/app/ui/cn";

// 提取 NavItem 组件以便复用和管理状态
const NavItem = ({
  href,
  icon,
  title,
  tag,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  tag?: string;
}) => {
  const pathname = usePathname();
  // 判断是否激活：严格匹配或者子路径匹配（排除根路径 /app 防止全部高亮）
  const isActive =
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-200",
        isActive
          ? "bg-white/[0.1] text-white shadow-sm" // 激活状态样式
          : "text-white/60 hover:bg-white/[0.06] hover:text-white" // 默认/悬停样式
      )}
    >
      <span
        className={cn(
          "transition-colors",
          isActive ? "text-white" : "text-white/50 group-hover:text-white"
        )}
      >
        {icon}
      </span>
      <span className="flex-1 text-sm font-medium">{title}</span>
      {tag ? (
        <span
          className={cn(
            "rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors",
            isActive
              ? "bg-white/20 text-white"
              : "bg-white/[0.08] text-white/50 group-hover:text-white/70"
          )}
        >
          {tag}
        </span>
      ) : null}
    </Link>
  );
};

export function Sidebar() {
  return (
    // 3. 样式优化：添加 h-screen 和 flex-col 确保布局高度正确
    <aside className="fixed left-0 top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0a0a0c] xl:flex">
      {/* Brand Header */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.10] bg-white/[0.04] p-3 px-4 shadow-sm">
          {/* 如果 BRAND 有 logo 可以放在这 */}
          <div>
            <div className="text-sm font-bold tracking-tight text-white">
              {BRAND.name}
            </div>
            <div className="text-[10px] text-white/40">{BRAND.tagline}</div>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-2 scrollbar-none">
        {/* Group 1: CONSOLE */}
        <div>
          <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
            Console
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

        {/* Group 2: SYSTEM */}
        <div>
          <div className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
            System
          </div>
          <div className="space-y-1">
            <NavItem
              href="/app/settings"
              icon={<Settings size={18} />}
              title="设置"
            />
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="mt-auto px-5 pb-6 pt-4">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <div className="text-xs font-medium text-white/80">
              System Online
            </div>
          </div>
          <div className="mt-2 text-[10px] leading-relaxed text-white/40">
            Production Environment
            <br />
            v2.4.0 (Stable)
          </div>
        </div>
      </div>
    </aside>
  );
}
