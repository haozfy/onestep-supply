import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

type Role = "admin" | "ops" | "client";

function sign(payload: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function verifyToken(token: string | undefined, secret: string): Role | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const role = parts[0] as Role;
  const exp = Number(parts[1]);
  const sig = parts[2];

  if (!["admin", "ops", "client"].includes(role)) return null;
  if (!Number.isFinite(exp) || Date.now() > exp) return null;

  const expected = sign(`${role}.${exp}`, secret);
  return expected === sig ? role : null;
}

function roleHome(role: Role) {
  if (role === "client") return "/app/client";
  if (role === "ops") return "/app/ops";
  return "/app/admin";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 只保护 /app 下的页面
  if (!pathname.startsWith("/app")) return NextResponse.next();

  const secret = process.env.APP_AUTH_SECRET || "";
  const token = req.cookies.get("os_role")?.value;
  const role = secret ? verifyToken(token, secret) : null;

  // 未登录 → 去 login
  if (!role) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 角色限制：client 只能看 /app/client；ops 只能看 /app/ops；admin 都能看
  if (role === "client" && !pathname.startsWith("/app/client")) {
    const url = req.nextUrl.clone();
    url.pathname = roleHome(role);
    return NextResponse.redirect(url);
  }

  if (role === "ops" && !pathname.startsWith("/app/ops")) {
    const url = req.nextUrl.clone();
    url.pathname = roleHome(role);
    return NextResponse.redirect(url);
  }

  // admin 默认可看全部；也可改成只能看 /app/admin
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};