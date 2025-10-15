import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

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

// 1. Specify protected and public routes

const publicRoutes = ["/auth/login", "/auth/sign-up", "/forgot-password"];

async function checkUserRole(token: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CORE_BASE_URL}auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data as User; // assuming the API returns the role of the user
  } catch (error) {
    console.error("Error validating role:", error);
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = !isPublicRoute;

  // 3. Decrypt the session from the cookie
  const token = await (await cookies()).get("printa_auth_session")?.value;

  // 5. Check if accessing protected route
  if (isProtectedRoute) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/auth/login", req.nextUrl);
      // Append the 'callback' query parameter
      loginUrl.searchParams.append("callback", req.nextUrl.toString());
      return NextResponse.redirect(loginUrl);
    }

    // If token exists, check if user is ADMIN
    const givenRole = await checkUserRole(token);
    const userRole = givenRole ? givenRole?.role : null;

    // If user is not ADMIN, redirect to login
    if (userRole !== "ADMIN") {
      const loginUrl = new URL("/auth/login", req.nextUrl);
      loginUrl.searchParams.append("callback", req.nextUrl.toString());
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
    const givenRole = await checkUserRole(token);
    const userRole = givenRole ? givenRole?.role : null;

    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
