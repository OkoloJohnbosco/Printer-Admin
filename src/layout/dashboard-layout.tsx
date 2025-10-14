import { AppSidebar } from "@/components/app-sidebar";
import NavHeader from "@/components/new-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-brand-gray-500">
        <NavHeader />
        <div className="container-wrapper py-4 sm:py-7">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
