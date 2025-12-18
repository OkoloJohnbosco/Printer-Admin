import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Payout } from "@/lib/hooks/payouts/use-get-all-payouts/use-get-all-payouts.types";
import { formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

function SuccessfulPayout({
  payout,
  onClose,
}: {
  payout: Payout;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4 px-4 py-6 text-center">
      <div className="bg-brand-green-200 mx-auto grid h-20 w-20 place-items-center rounded-full">
        <Check className="text-brand-green-300 size-10" />
      </div>

      <Heading size="h6" className="text-center font-semibold">
        Payout Review Completed
      </Heading>
      <p className="text-muted-foreground mx-auto w-full max-w-sm text-center text-sm">
        The payout request for ₦{formatCurrency(Number(payout.amount))} has been
        reviewed successfully.
      </p>
      <Button fullWidth onClick={onClose}>
        Done
      </Button>
    </div>
  );
}

export default SuccessfulPayout;
