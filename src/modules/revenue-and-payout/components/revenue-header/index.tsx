import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Download } from "lucide-react";

interface RevenueHeaderProps {
  onDownloadReport: () => void;
  isExporting?: boolean;
  isExportDisabled?: boolean;
}

function RevenueHeader({
  onDownloadReport,
  isExporting = false,
  isExportDisabled = false,
}: RevenueHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <Heading size="h4">Earnings Overview</Heading>
        <p className="text-muted-foreground text-sm sm:text-base">
          Track your revenue and manage payouts
        </p>
      </div>
      <div className="w-full shrink-0 lg:w-auto">
        <Button
          variant="outline"
          className="w-full bg-white lg:w-auto"
          onClick={onDownloadReport}
          disabled={isExporting || isExportDisabled}
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Downloading..." : "Download Report"}
        </Button>
      </div>
    </div>
  );
}

export default RevenueHeader;
