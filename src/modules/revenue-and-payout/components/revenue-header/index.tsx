import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Download } from "lucide-react";

function RevenueHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div>
        <Heading size={"h4"}>Earnings Overview</Heading>
        <p className="text-muted-foreground text-sm sm:text-base">
          Track your revenue and manage payouts
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="w-full bg-white sm:w-auto">
          <Download /> Download Report
        </Button>
      </div>
    </div>
  );
}

export default RevenueHeader;
