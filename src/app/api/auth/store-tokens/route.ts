import { PRINTA_APP_KEY } from "@/lib/constants";
import routes from "@/routes";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

function getSafeRedirectPath(callback: string | null): string {
  // Only allow same-app relative paths to avoid open redirects.
  if (
    callback &&
    callback.startsWith("/") &&
    !callback.startsWith("//") &&
    !callback.startsWith("/auth")
  ) {
    return callback;
  }

  return routes.DASHBOARD;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const callback = searchParams.get("callback");

  if (!accessToken || !refreshToken) {
    return new NextResponse("Missing tokens", { status: 400 });
  }

  const cookieStore = await cookies();

  cookieStore.set(PRINTA_APP_KEY.TOKEN, accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set(PRINTA_APP_KEY.REFRESH, refreshToken, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  // Fetch user profile to check onboarding status
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CORE_BASE_URL}me/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const user = res.data.data as User;

    const isAdmin = user?.role === "ADMIN";

    if (!isAdmin) {
      // Clear cookies if user is not an admin
      cookieStore.delete(PRINTA_APP_KEY.TOKEN);
      cookieStore.delete(PRINTA_APP_KEY.REFRESH);
      // Redirect to login with error message
      const loginUrl = new URL(routes.LOGIN, request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }

    cookieStore.set(PRINTA_APP_KEY.USER, JSON.stringify(user), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.redirect(
      new URL(getSafeRedirectPath(callback), request.url),
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    console.log(`${process.env.NEXT_PUBLIC_CORE_BASE_URL}me/profile`);

    // Handle 403 Forbidden - user not authorized for admin
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      // Clear cookies
      cookieStore.delete(PRINTA_APP_KEY.TOKEN);
      cookieStore.delete(PRINTA_APP_KEY.REFRESH);
      // Redirect to login with error message
      const loginUrl = new URL(routes.LOGIN, request.url);
      loginUrl.searchParams.set("error", "forbidden");
      return NextResponse.redirect(loginUrl);
    }

    // For other errors, redirect to login
    const loginUrl = new URL(routes.LOGIN, request.url);
    loginUrl.searchParams.set("error", "auth_failed");
    return NextResponse.redirect(loginUrl);
  }
}
