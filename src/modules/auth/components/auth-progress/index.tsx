import Heading from "@/components/ui/heading";
import { cn } from "@/lib/utils";

function AuthProgress({ activeStep = 1 }: { activeStep?: number }) {
  const stages = [1, 2, 3];
  return (
    <div className="space-y-2">
      <Heading size="h6" className="text-right">
        {activeStep}/{stages.length}
      </Heading>
      <div className="flex items-center gap-4">
        {stages.map((stage) => {
          return (
            <div
              key={stage}
              className={cn(
                "relative h-2 w-full",
                activeStep === stage
                  ? "bg-brand-foreground"
                  : "max-w-[80px] bg-white",
                activeStep > stage ? "bg-brand-primary" : "",
              )}
            >
              {activeStep === stage && (
                <span className="bg-brand-primary absolute top-0 left-0 h-full w-1/2"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AuthProgress;
