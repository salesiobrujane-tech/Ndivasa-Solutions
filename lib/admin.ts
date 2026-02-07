import { cookies } from "next/headers";

const COOKIE_NAME = "admin_auth";

export function isAdminAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return token === password;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 8
  };
}

export { COOKIE_NAME };
