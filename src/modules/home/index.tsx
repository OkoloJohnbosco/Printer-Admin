"use client";

import Loader from "@/components/ui/loader";
import useGetUserData from "@/lib/hooks/auth/use-get-user-data";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const userData = useGetUserData();

  useEffect(() => {
    const checkSession = async () => {
      const user = userData?.value?.data;
      if (user?.role === "ADMIN") {
        router.replace(routes.DASHBOARD);
      } else {
        router.replace(routes.LOGIN);
      }
    };

    if (userData?.status === "success" || userData?.status === "error") {
      checkSession();
    }
  }, [router, userData]);

  return (
    <div className="page-fade-in fixed top-0 left-0 flex h-screen w-full items-center justify-center">
      <Loader />
    </div>
  );
}
