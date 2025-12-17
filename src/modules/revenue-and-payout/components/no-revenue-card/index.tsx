import { Card, CardContent } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { ChartSpline } from "lucide-react";

export default function NoRevenueCard() {
  return (
    <Card className="@container/card border-0 shadow-none">
      <CardContent className="space-y-6 px-2 py-6 sm:px-6">
        <div className="text-brand-gray-200 flex h-full flex-col items-center justify-center space-y-4 pt-4">
          <div className="bg-brand-foreground grid h-16 w-16 place-items-center rounded-full">
            <ChartSpline className="text-brand-primary h-4 w-4" />
          </div>
          <div className="space-y-1 text-center">
            <Heading size="h6">No Revenue Data Yet</Heading>
            <p className="text-nm max-w-md text-center">
              Complete your first print job to start tracking your earnings.
              Your revenue chart will appear here once you begin earning.
            </p>
          </div>
        </div>
        <div className="text-center"></div>
      </CardContent>
    </Card>
  );
}
