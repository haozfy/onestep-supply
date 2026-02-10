// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac } from "crypto";

const COOKIE_NAME = "os_role";

function sign(secret: string, payload: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function roleFromToken(secret: string, token: string | undefined): "admin" | "ops" | "client" | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const role = parts[0];
  if (role !== "admin" && role !== "ops" && role !== "client") return null;

  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2];
  if (sig !== sign(secret, payload)) return null;
  return role;
}

export function middleware(req: NextRequest) {
  const secret = process.env.APP_AUTH_SECRET || "";
  const url = req.nextUrl;

  const isApp = url.pathname.startsWith("/app");
  const isLogin = url.pathname.startsWith("/login");

  const token = req.cookies.get(COOKIE_NAME)?.value;
  const role = secret ? roleFromToken(secret, token) : null;

  // 未登录访问 /app -> 去登录
  if (isApp && !role) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 已登录访问 /login -> 去默认页
  if (isLogin && role) {
    url.pathname = role === "client" ? "/app/client" : role === "ops" ? "/app/ops" : "/app";
    return NextResponse.redirect(url);
  }

  // 越权规则：client/ops 不能进 /app/admin
  if (url.pathname.startsWith("/app/admin") && role !== "admin") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login"],
};