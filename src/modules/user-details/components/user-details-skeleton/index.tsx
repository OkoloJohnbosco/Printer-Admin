import BackButton from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserDetailsSkeleton() {
  return (
    <div className="page-fade-in w-full">
      <main>
        <BackButton text="Back to Users" href="/users" />
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Skeleton className="mb-2 h-8 w-48 sm:h-9 sm:w-64" />
              <Skeleton className="h-4 w-32 sm:h-5 sm:w-40" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Action Sidebar - Shown first on mobile */}
          <div className="order-first space-y-6 lg:order-last">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="mt-0.5 h-5 w-5 shrink-0" />
                      <div className="min-w-0 space-y-1">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
