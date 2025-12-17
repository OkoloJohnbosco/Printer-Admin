import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Check } from "lucide-react";

function SucessfulPayout() {
  return (
    <div className="space-y-2 px-4 py-6 text-center">
      <div className="bg-brand-green-200 mx-auto grid h-20 w-20 place-items-center rounded-full">
        <Check className="text-brand-green-300 size-10" />
      </div>

      <Heading size="h6" className="text-center font-[600]">
        Payout Request Submitted
      </Heading>
      <p className="text-nm mx-auto w-full max-w-sm text-center">
        Your payout request for $3,485.75 has been submitted successfully. You
        will receive a confirmation email shortly.
      </p>
      <Button fullWidth>Done</Button>
    </div>
  );
}

export default SucessfulPayout;
