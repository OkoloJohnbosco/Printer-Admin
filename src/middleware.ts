import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { PRINTA_APP_KEY } from "./lib/constants";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

// 1. Specify public routes (everything else will be protected)
const publicRoutes = [
  "/auth/login",
  "/auth/sign-up",
  "/auth/sign-up/verify-email",
  "/auth/forgot-password",
  "/auth/forgot-password/verify-email",
  "/auth/reset-password",
];

async function getUserFromCookie(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get(PRINTA_APP_KEY.USER)?.value;

    if (!userCookie) {
      return null;
    }

    return JSON.parse(userCookie) as User;
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = !isPublicRoute;

  // Relative target so the callback never leaks the internal origin the app is
  // proxied on, and can only ever point back into this app.
  const callbackUrl = `${path}${req.nextUrl.search}`;

  // 3. Decrypt the session from the cookie
  const userData = await getUserFromCookie();
  const cookieStore = await cookies();
  const token = cookieStore.get(PRINTA_APP_KEY.TOKEN)?.value;

  // 5. Check if accessing protected route
  if (isProtectedRoute) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/auth/login", req.nextUrl);
      // Append the 'callback' query parameter
      loginUrl.searchParams.set("callback", callbackUrl);
      return NextResponse.redirect(loginUrl);
    }

    // If token exists, check if user is ADMIN
    const userRole = userData?.role;

    // If user is not ADMIN, redirect to login
    if (userRole !== "ADMIN") {
      const loginUrl = new URL("/auth/login", req.nextUrl);
      loginUrl.searchParams.set("callback", callbackUrl);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 6. Redirect to /dashboard if the user is authenticated and accessing public routes
  if (
    isPublicRoute &&
    token &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    // Verify user is ADMIN before redirecting to dashboard
    const userRole = userData?.role;

    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
