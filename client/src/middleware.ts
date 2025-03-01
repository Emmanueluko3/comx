// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { individualSteps, corporateSteps, PAGES } from "./utils/constants";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const allSteps = [
    ...individualSteps,
    ...corporateSteps,
    ...Object.values(PAGES.auth.individualPages),
    ...Object.values(PAGES.auth.corporatePages),
    PAGES.auth.register,
  ];
  console.log(allSteps.includes(pathname));
  if (pathname.startsWith("/register") && !allSteps.includes(pathname)) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}
