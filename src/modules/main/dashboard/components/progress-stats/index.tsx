import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Status = "not_started" | "in_progress" | "completed";

function ProgressStats({ status, title }: { status: Status; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="font-[500] text-nm">{title}</p>
        <p
          className={cn(
            "text-xs",
            status === "in_progress"
              ? "text-brand-yellow-200"
              : status === "completed"
              ? "text-brand-green-300"
              : "text-brand-gray-600"
          )}
        >
          In progress
        </p>
      </div>
      <Progress value={66} className="w-full" />
    </div>
  );
}

export default ProgressStats;
