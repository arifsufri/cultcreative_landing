// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// import { NextRequest, NextResponse } from "next/server";

// const intlMiddleware = createMiddleware(routing);

// export default function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   if (pathname === "/") {
//     return NextResponse.redirect(new URL("/my/home", request.url));
//   }

//   if (pathname === "/my" || pathname === "/sg") {
//     const locale = pathname.slice(1);
//     request.nextUrl.pathname = `/${locale}/home`;
//     return NextResponse.rewrite(request.nextUrl);
//   }

//   const response = intlMiddleware(request);

//   if (!pathname.startsWith("/my") && !pathname.startsWith("/sg")) {
//     const url = new URL(`/${routing.defaultLocale}${pathname}`, request.url);
//     return NextResponse.redirect(url);
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/",
//     "/(my|sg)/:path*",
//     "/brands",
//     "/creators",
//     "/about",
//     "/faq",
//     "/contact",
//     "/resources",
//     "/newsroom",
//     "/privacy-policy",
//     "/terms-and-conditions",
//   ],
// };

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Map countries to your locales
const countryToLocale: Record<string, "my" | "sg"> = {
  MY: "my",
  SG: "sg",
  // Add more as needed; everything else falls back to defaultLocale
};

function isLocalIp(ip: string): boolean {
  return (
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.")
  );
}

async function detectLocaleFromIp(ip: string): Promise<"my" | "sg" | null> {
  try {
    const res = await fetch(
      `https://api.ipapi.com/api/${ip}?access_key=${process.env.IP_API_KEY}`,
    );
    const data = await res.json();

    // console.log("[i18n] detected country:", country, "from ip:", ip);
    return data.country_code ?? null;
  } catch (err) {
    console.error("[i18n] geo lookup failed:", err);
    return null;
  }
}

async function resolveLocale(request: NextRequest): Promise<"my" | "sg"> {
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (savedLocale === "my" || savedLocale === "sg") return savedLocale;

  let ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (process.env.NODE_ENV === "development" && (!ip || isLocalIp(ip))) {
    ip = "8.8.8.8"; // swap to test: 175.139.0.1 (MY), 103.10.124.1 (SG)
  }

  if (ip && !isLocalIp(ip)) {
    const result = await detectLocaleFromIp(ip);
    if (result) return result.toLowerCase() as "my" | "sg";
  }

  return routing.defaultLocale as "my" | "sg";
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle bare locale paths
  if (pathname === "/my" || pathname === "/sg") {
    const locale = pathname.slice(1);
    request.nextUrl.pathname = `/${locale}/home`;
    return NextResponse.rewrite(request.nextUrl);
  }

  // Detect locale and redirect for root and any non-locale-prefixed path
  if (!pathname.startsWith("/my") && !pathname.startsWith("/sg")) {
    const locale = await resolveLocale(request);
    const target =
      pathname === "/" ? `/${locale}/home` : `/${locale}${pathname}`;
    const response = NextResponse.redirect(new URL(target, request.url));
    response.cookies.set("NEXT_LOCALE", locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(my|sg)/:path*",
    "/brands",
    "/creators",
    "/about",
    "/faq",
    "/contact",
    "/resources",
    "/newsroom",
    "/privacy-policy",
    "/terms-and-conditions",
  ],
};
