import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Download } from "lucide-react";

function RevenueHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <Heading size={"h4"}>Earnings Overview</Heading>
        <p className="text-nm">Track your revenue and manage payouts</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="bg-white">
          <Download /> Download Report
        </Button>
      </div>
    </div>
  );
}

export default RevenueHeader;
