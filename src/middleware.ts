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
    const res = await fetch(`https://ipapi.co/${ip}/country/`, {
      signal: AbortSignal.timeout(800),
    });
    const country = (await res.text()).trim();
    console.log("[i18n] detected country:", country, "from ip:", ip);
    return countryToLocale[country] ?? null;
  } catch (err) {
    console.error("[i18n] geo lookup failed:", err);
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle root path: detect locale and redirect
  if (pathname === "/") {
    // If user already has a saved preference, respect it
    const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (savedLocale === "my" || savedLocale === "sg") {
      return NextResponse.redirect(
        new URL(`/${savedLocale}/home`, request.url),
      );
    }

    // Otherwise, detect from IP
    let ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    if (process.env.NODE_ENV === "development" && (!ip || isLocalIp(ip))) {
      ip = "8.8.8.8"; // swap to test: 175.139.0.1 (MY), 103.10.124.1 (SG)
    }

    let detectedLocale: "my" | "sg" = routing.defaultLocale as "my" | "sg";
    if (ip && !isLocalIp(ip)) {
      const result = await detectLocaleFromIp(ip);
      if (result) detectedLocale = result;
    }

    const response = NextResponse.redirect(
      new URL(`/${detectedLocale}/home`, request.url),
    );
    response.cookies.set("NEXT_LOCALE", detectedLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
    return response;
  }

  // Handle bare locale paths
  if (pathname === "/my" || pathname === "/sg") {
    const locale = pathname.slice(1);
    request.nextUrl.pathname = `/${locale}/home`;
    return NextResponse.rewrite(request.nextUrl);
  }

  // Redirect non-locale paths to default locale
  if (!pathname.startsWith("/my") && !pathname.startsWith("/sg")) {
    const url = new URL(`/${routing.defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(url);
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
