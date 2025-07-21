import { ChartLine } from "lucide-react";

function VerificationStatusEmptyState() {
  return (
    <div className="space-y-4 h-full flex flex-col justify-center items-center">
      <div className="h-12 w-12 grid place-items-center bg-brand-purple-500 rounded-full">
        <ChartLine className="h-4 w-4 text-brand-purple-400" />
      </div>
      <p>Complete your first job to see revenue analytics</p>
    </div>
  );
}

export default VerificationStatusEmptyState;
