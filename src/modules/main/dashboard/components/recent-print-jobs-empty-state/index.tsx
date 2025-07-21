import Heading from "@/components/ui/heading";
import { CheckCircle2Icon, Printer } from "lucide-react";

function RecentPrintJobsEmptyState() {
  return (
    <div className="space-y-4 pt-4 h-full flex flex-col justify-center items-center text-brand-gray-200">
      <div className="h-16 w-16 grid place-items-center bg-brand-purple-100 rounded-full">
        <Printer className="h-4 w-4 text-brand-purple-400" />
      </div>
      <div className="text-center space-y-1">
        <Heading size="h6">No Print Jobs Yet</Heading>
        <p className="text-nm">
          Start by setting up your print services and accepting your first job
        </p>
      </div>
      <div className="flex flex-col space-y-2.5">
        <p className="inline-flex gap-1 text-xs items-center">
          <CheckCircle2Icon className="size-3 text-brand-purple-400" />
          Set up your equipment details
        </p>

        <p className="inline-flex gap-1 text-xs items-center">
          <CheckCircle2Icon className="size-3 text-brand-purple-400" />
          Add your printing capabilities
        </p>

        <p className="inline-flex gap-1 text-xs items-center">
          <CheckCircle2Icon className="size-3 text-brand-purple-400" />
          Set your pricing and policies
        </p>
      </div>
    </div>
  );
}

export default RecentPrintJobsEmptyState;
