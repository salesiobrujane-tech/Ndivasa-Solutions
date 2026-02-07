import { NextResponse } from "next/server";
import { adminCookieOptions, COOKIE_NAME } from "@/lib/admin";

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Senha inválida." }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, password, adminCookieOptions());
  return response;
}
