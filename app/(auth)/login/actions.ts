"use server";

type Role = "admin" | "ops" | "client";

function roleFromPassword(pwdRaw: string): Role | null {
  const pwd = (pwdRaw ?? "").trim();

  if (pwd === "Hao") return "admin";
  if (pwd === "Zhou") return "ops";
  if (pwd === "Tao") return "client";
  return null;
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  // ✅ 调试：告诉你服务器实际收到了什么（只回长度，不回内容）
  const len = password.length;
  const trimmedLen = password.trim().length;

  const role = roleFromPassword(password);
  if (!role) {
    return {
      ok: false,
      message: `密码错误（server收到长度=${len}, trim后长度=${trimmedLen}）`,
    };
  }

  // ✅ 先不写 cookie，不 redirect，只验证 role 能不能识别
  return { ok: true, role };
}