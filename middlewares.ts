import { NextRequest, NextResponse } from "next/server";

// List of pages/routes that require authentication
const protectedRoutes = [
  "/webapp",
  "/plugin",
  "/plugincurrent",
  "/plugin2",
  "/multisiteconnect",
];

// List of auth pages
const authRoutes = ["/auth"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  const { pathname } = req.nextUrl;

  // If user is logged in and tries to access login/signup → redirect to /webapp
if (token && (pathname.toLowerCase() === "/auth" || pathname.toLowerCase() === "/signup")) {
    return NextResponse.redirect(new URL("/webapp", req.url));
  }

  // If user is NOT logged in and tries to access protected pages → redirect to /login
  if (!token && protectedRoutes.includes(pathname.toLowerCase())) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // allow all other requests
  return NextResponse.next();
}

// Specify which paths the middleware applies to
export const config = {
  matcher: [
  
    "/auth",
    "/webapp",
    "/plugin",
    "/plugincurrent",
    "/plugin2",
    "/multisiteconnect",
  ],
};
