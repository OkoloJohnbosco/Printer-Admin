import Loader from "@/components/ui/loader";
import DashboardLayoutWrapper from "@/layout/dashboard-layout";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayoutWrapper>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </DashboardLayoutWrapper>
  );
}
