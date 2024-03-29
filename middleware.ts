import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const session = await auth()

  const pathName = request.nextUrl.pathname;
  if (pathName.startsWith("/")) {
    if (session) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
