import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function OrderDetailsSkeleton() {
  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6">
          <Skeleton className="mb-4 h-9 w-32" />
          <Skeleton className="mb-2 h-9 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="mt-0.5 h-5 w-5" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>

            <Card className="@container/card shadow-none">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
