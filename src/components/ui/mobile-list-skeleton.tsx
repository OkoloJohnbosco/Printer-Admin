import { Skeleton } from "@/components/ui/skeleton";

interface MobileListSkeletonProps {
  rows?: number;
}

export function MobileListSkeleton({ rows = 5 }: MobileListSkeletonProps) {
  return (
    <div className="divide-y md:hidden">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
