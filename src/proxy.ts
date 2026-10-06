import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const homepageEducationAliases = new Set([
  "/education",
  "/academic",
  "/academic-profile",
]);

export function proxy(request: NextRequest) {
  if (!homepageEducationAliases.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/#education", request.url), 308);
}

export const config = {
  matcher: ["/education", "/academic", "/academic-profile"],
};
