import { NextRequest, NextResponse } from "next/server";

type Role = "admin" | "ops" | "client" | "unknown";

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes: ArrayBuffer) {
  const arr = new Uint8Array(bytes);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(secret: string, data: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return bytesToHex(sig);
}

async function getRoleFromToken(token?: string | null): Promise<Role> {
  if (!token) return "unknown";
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return "unknown";

  const secret = process.env.APP_AUTH_SECRET;
  if (!secret) return "unknown";

  const expected = await hmacSha256Hex(secret, payload);
  if (expected !== sig) return "unknown";

  const role = payload.split(":")[0];
  if (role === "admin" || role === "ops" || role === "client") return role;
  return "unknown";
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 放行登录页与静态资源
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 只保护 /app 相关
  if (!pathname.startsWith("/app")) return NextResponse.next();

  const token = req.cookies.get("os_role")?.value;
  const role = await getRoleFromToken(token);

  // 未登录：踢到 /login
  if (role === "unknown") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 权限规则
  const needAdmin = pathname.startsWith("/app/admin") || pathname.startsWith("/app/settings");
  const needClient = pathname.startsWith("/app/client");
  const needOps = pathname.startsWith("/app/ops");

  if (needAdmin && role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  if (needClient && !(role === "client" || role === "admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  if (needOps && !(role === "ops" || role === "admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};