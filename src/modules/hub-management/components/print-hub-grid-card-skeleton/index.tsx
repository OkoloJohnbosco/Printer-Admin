"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function PrintHubGridCardSkeleton() {
  return (
    <Card className="@container/card shadow-none">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {/* Logo skeleton */}
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-1">
              {/* Hub name skeleton */}
              <Skeleton className="h-5 w-32" />
              {/* Location skeleton */}
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          {/* Status badge skeleton */}
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Metrics grid skeleton */}
        <div className="border-border grid grid-cols-3 gap-4 border-t pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-12" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-8 w-12" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </div>

        {/* Capacity section skeleton */}
        <div className="border-border border-t pt-4">
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>
          {/* Progress bar skeleton */}
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        {/* Button skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

// Multiple skeletons for grid layout
function PrintHubGridSkeletons({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <PrintHubGridCardSkeleton key={index} />
      ))}
    </>
  );
}

export default PrintHubGridCardSkeleton;
export { PrintHubGridSkeletons };
