import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { CheckCircle2Icon, Wallet2, WalletCards } from "lucide-react";

function RequestPayoutTemplate() {
  return (
    <Card className="@container/card shadow-none border-0">
      <CardHeader>
        <CardTitle>
          <Heading size="h7" className="font-[700]">
            Request Payout
          </Heading>
        </CardTitle>
        <CardDescription>
          Withdraw your available earnings to your preferred payment method
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <div className="px-2 py-6 space-y-6 sm:px-6 bg-brand-gray-40 rounded-2xl">
          <div className="space-y-4 pt-4 h-full flex flex-col justify-center items-center text-brand-gray-200">
            <div className="h-16 w-16 grid place-items-center bg-brand-gray-50 rounded-full">
              <Wallet2 className="h-4 w-4 text-brand-gray-600" />
            </div>
            <div className="text-center space-y-1">
              <Heading size="h6">Get Started with Payouts</Heading>
              <p className="text-nm">
                Before you can request payouts, you&apos;ll need to:
              </p>
            </div>
            <div className="flex flex-col space-y-2.5">
              <p className="inline-flex gap-1 text-xs items-center">
                <CheckCircle2Icon className="size-3 text-brand-primary" />
                Complete your account verification
              </p>

              <p className="inline-flex gap-1 text-xs items-center">
                <CheckCircle2Icon className="size-3 text-brand-primary" />
                Add a payment method
              </p>

              <p className="inline-flex gap-1 text-xs items-center">
                <CheckCircle2Icon className="size-3 text-brand-primary" />
                Complete your first print job
              </p>
            </div>
          </div>
          <div className="py-4 text-center">
            <Button size="sm" className="text-xs text-white">
              <WalletCards />
              Set Up Payment Method
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RequestPayoutTemplate;
