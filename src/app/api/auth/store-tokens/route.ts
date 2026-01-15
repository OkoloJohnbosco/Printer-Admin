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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

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
      `${process.env.NEXT_PUBLIC_CORE_BASE_URL}auth/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const user = res.data.data as User;

    const isAdmin = user?.role === "ADMIN";

    cookieStore.set(PRINTA_APP_KEY.USER, JSON.stringify(user), {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    // Decide redirect path
    const redirectUrl = isAdmin ? routes.DASHBOARD : routes.LOGIN;

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
