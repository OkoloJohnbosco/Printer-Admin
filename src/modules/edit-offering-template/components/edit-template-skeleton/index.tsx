import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component
export default function EditTemplateSkeleton() {
  return (
    <div className="page-fade-in min-h-[calc(100vh_-_96px)] sm:min-h-[calc(100vh_-_120px)]">
      <main className="container mx-auto space-y-6 py-6">
        <div className="mb-6 space-y-4">
          <Skeleton className="h-4 w-48" />
          <div>
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>

        <div className="grid max-w-4xl gap-6">
          {/* Basic Information Skeleton */}
          <Card className="shadow-none">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Specifications Skeleton */}
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 rounded-lg border p-4">
                <Skeleton className="h-5 w-32" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 rounded-lg border p-4">
                <Skeleton className="h-5 w-32" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
