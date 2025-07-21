import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { ArrowRight, Shield } from "lucide-react";

function VerificationBanner() {
  return (
    <div className="p-5  bg-white w-full rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-16 w-16 md:h-24 md:w-24 shrink-0 rounded-full grid place-items-center bg-brand-yellow-100">
            <Shield className="h-7 w-7 md:h-10 md:w-10 text-brand-yellow-200" />
          </div>
          <div className="space-y-2">
            <Heading size={"h6"}>Start Your Verification</Heading>
            <p className="text-sm">
              Complete the verification process to have access to features and
              access high-value print jobs.
            </p>
            <Button>
              Start Verification
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="h-20 w-20 rounded-full grid place-items-center border-2 border-brand-yellow-300">
            <Heading size="h6" className="text-brand-yellow-300">
              0%
            </Heading>
          </div>
          <p className="text-nm">Completion</p>
        </div>
      </div>
    </div>
  );
}

export default VerificationBanner;
