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

// `request.url` resolves to the internal origin this app is proxied on
// (localhost:8080), so absolute redirects send the browser off the public
// domain. A relative Location keeps the user on whichever host they came from.
function redirectTo(path: string) {
  return new NextResponse(null, {
    status: 307,
    headers: { Location: path },
  });
}

function redirectToLoginWithError(error: string) {
  return redirectTo(`${routes.LOGIN}?error=${encodeURIComponent(error)}`);
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
      return redirectToLoginWithError("unauthorized");
    }

    cookieStore.set(PRINTA_APP_KEY.USER, JSON.stringify(user), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return redirectTo(getSafeRedirectPath(callback));
  } catch (error) {
    console.error("Error fetching user:", error);
    console.log(`${process.env.NEXT_PUBLIC_CORE_BASE_URL}me/profile`);

    // Handle 403 Forbidden - user not authorized for admin
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      // Clear cookies
      cookieStore.delete(PRINTA_APP_KEY.TOKEN);
      cookieStore.delete(PRINTA_APP_KEY.REFRESH);
      // Redirect to login with error message
      return redirectToLoginWithError("forbidden");
    }

    // For other errors, redirect to login
    return redirectToLoginWithError("auth_failed");
  }
}
