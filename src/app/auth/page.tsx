"use client";

import routes from "@/routes";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const AuthRedirect = () => {
  useEffect(() => {
    redirect(routes.LOGIN);
  });
  return <></>;
};

export default AuthRedirect;
export const dynamic = "force-dynamic"; // Ensure this page is always server-rendered
